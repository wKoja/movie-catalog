import sqlite from "better-sqlite3";
import path from "path";
import config from "../config.js";
const db = new sqlite(path.resolve(config.__dirname, "../alinea-test.db"), {
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

export { query, run };
