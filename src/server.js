import express from "express";
import logger from "morgan";
import path from "path";
import moviesRouter from "./routes/moviesRoute.js";
import loginRouter from "./routes/loginRoute.js";
import registerRouter from "./routes/registerRoute.js";
import config from "./config.js";

const app = express();

app.set("views", path.join(config.__dirname, "./views"));
app.set("view-engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/movies", moviesRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.get("/", (req, res) => {
  res.render("indexView.ejs", { name: "Erika" });
});

app.get("/test", (req, res) => {
  res.status(200).send({
    title: "test",
    message: "hi mom 😀",
  });
});

export default app;
