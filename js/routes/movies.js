const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("../../alinea-test.db", (err) => {
  if (err) {
    console.error("Erro ao abrir base" + err.message);
  }
});

router.get("/movies", (req, res, next) => {
  db.all("SELECT * FROM FILMES", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

module.exports = router;
