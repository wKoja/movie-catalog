import express from "express";
const router = express.Router();
import * as moviesService from "../services/moviesService.js";

//retorna todos os filmes
router.get("/", (req, res) => {
  try {
    let result = moviesService.getAll();
    if (result.length === 0) {
      res.status(404).send({ error: "Não há filmes no banco de dados" });
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    sendError(res, "Erro ao buscar filmes", err);
  }
});

//retorna filme por id
router.get("/:id", (req, res) => {
  let params = req.params.id;
  try {
    let data = moviesService.getById(params);
    if (data.length === 0) {
      res.status(404).send({ error: "Filme nao encontrado" });
      return;
    }
    res.status(200).send(moviesService.getById(params));
  } catch (err) {
    sendError(res, "Erro ao buscar filme", err);
  }
});

//adiciona um filme no banco de dados
router.post("/", (req, res) => {
  let body = req.body;
  if (Object.entries(body).length == 0) {
    res.status(400).send({ error: "Deve ter body" });
  }
  try {
    let result = moviesService.create(body);
    if (Object.keys(result).includes("error")) {
      sendError(res, "Erro ao inserir filme", err);
    }
    res.status(201).send(result);
  } catch (err) {
    sendError(res, "Erro ao inserir filme", err);
  }
});

//atualiza um filme por ID
router.patch("/:id", (req, res) => {
  let body = req.body;
  let id = req.params.id;
  const params = { body, id };
  try {
    let result = moviesService.update(params);
    if (Object.keys(result).includes("error")) {
      res.status(404).send(result);
    }
    res.status(200).send(result);
  } catch (err) {
    sendError(res, "Erro ao atualizar o filme", err);
  }
});

//deleta um filme por ID
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  try {
    let movie = moviesService.getById(id);
    if (movie.length == 0) {
      res.status(404).send({ error: "Filme não encontrado" });
    }
    res.status(204).send(moviesService.deletaFilme(id));
  } catch (err) {
    sendError(res, "Erro ao deletar filme", err);
  }
});

function sendError(res, message, err) {
  res.status(500).send({ error: "Ocorreu um erro interno." });
  console.error(message, err.message);
}

export default router;
