const express = require("express");
const router = express.Router();
const movies = require("../services/movies");

//retorna todos os filmes
router.get("/", (req, res, next) => {
  try {
    res.status(200).send(movies.getAll());
  } catch (err) {
    console.error("Erro ao buscar filmes", err.message);
    //usar res.status(400)?
    next(err);
  }
});

//retorna filme por id
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

//adiciona um filme no banco de dados
router.post("/", (req, res, next) => {
  var body = req.body;
  try {
    res.status(201).send(movies.create(body));
  } catch (err) {
    console.error("Erro ao cadastrar filme", err.message);
    next(err);
  }
});

module.exports = router;
