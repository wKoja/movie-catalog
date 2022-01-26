const db = require("./db");

function getAll() {
  try {
    return db.query(`SELECT * FROM FILMES`, []);
  } catch (err) {
    return err;
  }
}

function getById(params) {
  try {
    return db.query(`SELECT * FROM FILMES WHERE id = ?`, params);
  } catch (err) {
    return err;
  }
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

  try {
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
  } catch (err) {
    return err;
  }
}

function update(params) {
  var id = params.id;
  moviePrev = getById(id)[0];
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

  try {
    const result = db.run(
      "UPDATE FILMES SET nome_filme = ?, diretor = ?, genero = ?, em_cartaz = ?, data_lancamento = ?, imagem_url = ? WHERE id = ?",
      paramsArr
    );
    let message = { error: "Filme não encontrado" };
    if (result.changes) {
      message = { message: "Filme atualizado com sucesso" };
    }
    return message;
  } catch (err) {
    return err;
  }
}

function deletaFilme(movieId) {
  try {
    return db.run("DELETE FROM FILMES WHERE id = ?", movieId);
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deletaFilme,
};
