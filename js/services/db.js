const sqlite = require("better-sqlite3");
const path = require("path");
const db = new sqlite(path.resolve(__dirname, "../../alinea-test.db"), {
  fileMustExist: true,
});

//executa queries
function query(sql, params) {
  return db.prepare(sql).all(params);
}

//executa inserts, deletes, updates...
function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = { query, run };
