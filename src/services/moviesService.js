import * as db from "./dbService.js";

function getAll() {
  return db.query(`SELECT * FROM FILMES`, []);
}

function getById(params) {
  return db.query(`SELECT * FROM FILMES WHERE id = ?`, params);
}

function create(movieObj) {
  const paramsArr = [
    null,
    movieObj.nome_filme,
    movieObj.diretor,
    movieObj.genero,
    movieObj.em_cartaz,
    movieObj.data_lancamento,
    movieObj.imagem_url,
  ];

  const result = db.run(
    "INSERT INTO FILMES (id, nome_filme, diretor, genero, em_cartaz, data_lancamento, imagem_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
    paramsArr
  );

  let message = { error: "Erro ao inserir filme" };
  if (result.changes) {
    message = {
      message: "Filme inserido com sucesso",
      idFilme: result.lastInsertRowid,
    };
  }
  return message;
}

function update(params) {
  let id = params.id;
  let moviePrev = getById(id)[0];
  /*usa spread operator pra substituir informacoes velhas (moviePrev)
		com informacoes novas (params.body)
	*/
  const movieNew = { ...moviePrev, ...params.body };
  const paramsArr = [
    movieNew.nome_filme,
    movieNew.diretor,
    movieNew.genero,
    movieNew.em_cartaz,
    movieNew.data_lancamento,
    movieNew.imagem_url,
    id,
  ];

  const result = db.run(
    "UPDATE FILMES SET nome_filme = ?, diretor = ?, genero = ?, em_cartaz = ?, data_lancamento = ?, imagem_url = ? WHERE id = ?",
    paramsArr
  );
  let message = { error: "Filme não encontrado" };
  if (result.changes) {
    message = { message: "Filme atualizado com sucesso" };
  }
  return message;
}

function deletaFilme(movieId) {
  return db.run("DELETE FROM FILMES WHERE id = ?", movieId);
}

export { getAll, getById, create, update, deletaFilme };
