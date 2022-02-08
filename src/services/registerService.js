import * as db from "./dbService.js";
import bcrypt from "bcrypt";

async function registerUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = [null, userData.name, userData.email, hashedPassword];
  const result = db.run(
    "INSERT INTO LOGIN (id, name, username, password) VALUES (?, ?, ?, ?)",
    user
  );

  let message = { error: "Failed to register new user" };
  if (result.changes) {
    message = {
      message: "User registered successfully",
      idFilme: result.lastInsertRowid,
    };
  }
  return message;
}

export { registerUser };
