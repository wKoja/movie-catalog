import * as db from "./dbService.js";
import bcrypt from "bcrypt";

function registerUser(userData) {
  const hashedPassword = bcrypt.hash(userData.password, 10);
  const user = {
    id: null,
    name: userData.name,
    username: userData.username,
    password: hashedPassword,
  };
  const result = db.run(
    "INSERT INTO LOGIN (id, name, username, password) VALUES (?, ?, ?, ?)",
    user
  );

  let message = { error: "Erro ao registrar usuario" };
  if (result.changes) {
    message = {
      message: "Usuario registrado com sucesso",
      idFilme: result.lastInsertRowid,
    };
  }
  return message;
}

export { registerUser };
