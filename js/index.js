const express = require("express");
const app = express();
const logger = require("morgan");
const moviesRouter = require("./routes/movies");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/movies", moviesRouter);

app.get("/test", (req, res) => {
  res.status(200).send({
    title: "test",
    message: "hi mom 😀",
  });
});

module.exports = app;
