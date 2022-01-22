const db = require("./db");

function getAll() {
  const data = db.query(`SELECT * FROM FILMES`, []);
  return data;
}

function getById(params) {
  const data = db.query(`SELECT * FROM FILMES WHERE id = ?`, params);
  return data;
}

module.exports = {
  getAll,
  getById,
};
