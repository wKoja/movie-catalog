const db = require("./db");

function getAll() {
  const data = db.query(`SELECT * FROM FILMES`, []);
  return data;
}

function getById(params) {
  const data = db.query(`SELECT * FROM FILMES WHERE id = ?`, params);
  return data;
}

function create(movieObj) {
  //TODO enviar movieObj direto
  const paramsArr = [
    movieObj.id,
    movieObj.nome_filme,
    movieObj.diretor,
    movieObj.genero,
    movieObj.em_cartaz,
    movieObj.data_lancamento,
    movieObj.imagem_url,
  ];
  console.log(paramsArr);
  const result = db.run(
    "INSERT INTO FILMES (id, nome_filme, diretor, genero, em_cartaz, data_lancamento, imagem_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
    paramsArr
  );

  //  const result = db.run(
  //    "INSERT INTO FILMES (id, nome_filme, diretor, genero, em_cartaz, data_lancamento, imagem_url) VALUES (@id, @nome_filme, @diretor, @genero, @em_cartaz, @data_lancamento, @imagem_url)", paramsArr );
  //
  let message = "Erro ao inserir filme";
  if (result.changes) {
    message = "Filme inserido com sucesso";
  }
  return message;
}

module.exports = {
  getAll,
  getById,
  create,
};
