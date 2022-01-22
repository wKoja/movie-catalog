const express = require("express");
const router = express.Router();
const movies = require("../services/movies");

router.get("/", (req, res, next) => {
  try {
    res.status(200).send(movies.getAll());
  } catch (err) {
    console.error("Erro ao buscar filmes", err.message);
    //usar res.status(400)?
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  var params = [req.params.id];
  try {
    data = movies.getById(params);
    if (data.length == 0) {
      res.status(404).send("Filme nao encontrado");
      return;
    }
    res.status(200).send(movies.getById(params));
  } catch (err) {
    console.error("Erro ao buscar filme", err.message);
    next(err);
  }
});

module.exports = router;
