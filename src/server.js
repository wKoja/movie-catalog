const express = require("express");
const app = express();
const logger = require("morgan");
const moviesRouter = require("./routes/moviesRoute");
const loginRouter = require("./routes/loginRoute");
const registerRouter = require("./routes/registerRoute");
const path = require("path");

//FIXME find a way to configure default paths
app.set("views", path.join(__dirname, "./views"));
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

module.exports = app;
