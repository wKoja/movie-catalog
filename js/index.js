const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const sqlite3 = require("sqlite3");
const logger = require("morgan");
//const moviesRouter = require("./routes/movies");

var dbFile = path.resolve(__dirname, "../alinea-test.db");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () =>
  console.log(`aplicacao subiu com sucesso em http://localhost:${PORT}`)
);

//app.use("/movies", moviesRouter);

const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Erro ao abrir base" + err.message);
  }
  console.log(`Conectado na base com sucesso.`);
});

app.get("/movies", (req, res, next) => {
  db.all("select * from FILMES", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

app.get("/test", (req, res) => {
  res.status(200).send({
    title: "test",
    message: "hi mom 😀",
  });
});

module.exports = app;
