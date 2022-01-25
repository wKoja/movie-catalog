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
  var params = req.params.id;
  try {
    data = movies.getById(params);
    if (data.length == 0) {
      res.status(404).send({ error: "Filme nao encontrado" });
      return;
    }
    res.status(200).send(movies.getById(params));
  } catch (err) {
    console.error("Erro ao buscar filme", err.message);
    next(err);
  }
});

//adiciona um filme no banco de dados
//TODO tratar erros
router.post("/", (req, res, next) => {
  var body = req.body;
  try {
    res.status(201).send(movies.create(body));
  } catch (err) {
    console.error("Erro ao cadastrar filme", err.message);
    next(err);
  }
});

//atualiza um filme por ID
router.patch("/:id", (req, res, next) => {
  var body = req.body;
  var id = req.params.id;
  const params = { body, id };
  try {
    res.status(200).send(movies.update(params));
  } catch (err) {
    console.error("Erro ao atualizar filme", err.message);
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  var id = req.params.id;
  try {
    var movie = movies.getById(id);
    if (movie.length == 0) {
      res.status(404).send({ error: "Filme não encontrado" });
    }
    res.status(204).send(movies.deletaFilme(id));
  } catch (err) {
    console.error("Erro ao deletar filme", err.message);
    next(err);
  }
});

module.exports = router;
