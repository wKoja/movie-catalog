import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import logger from "morgan";
import path from "path";
import moviesRouter from "./routes/moviesRoute.js";
import loginRouter from "./routes/loginRoute.js";
import registerRouter from "./routes/registerRoute.js";
import config from "./config.js";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import { checkAuthenticated } from "./services/loginService.js";

const app = express();

app.set("views", path.join(config.__dirname, "./views"));
app.set("view-engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* auth */
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
/* auth */

/* routes */
app.use("/movies", moviesRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
/* routes */

app.get("/", checkAuthenticated, (req, res) => {
  res.render("indexView.ejs", { name: req.user.name });
});

app.get("/test", (req, res) => {
  res.status(200).send({
    title: "test",
    message: "hi mom 😀",
  });
});

export default app;
