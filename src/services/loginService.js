import * as db from "./dbService.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

function initializePassport(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByUsername(email)[0];
    if (user.length == 0) {
      return done(null, false, { message: "No user found" });
    }
    try {
      if (await comparePasswords(user, password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Wrong password" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((user, done) => {
    done(null, getUserById(user.id));
  });
}

async function comparePasswords(user, password) {
  let userPassword = user.password;
  return bcrypt.compare(password, userPassword);
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  next();
}

function getUserByUsername(username) {
  return db.query("SELECT * FROM LOGIN WHERE username = ?", username);
}

function getUserById(userId) {
  return db.query("SELECT * FROM LOGIN WHERE id = ?", userId);
}

export { initializePassport, checkAuthenticated };
