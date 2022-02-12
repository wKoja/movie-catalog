import express from "express";
import * as registerService from "../services/registerService.js";
import { checkAuthenticated } from "../services/loginService.js";
const router = express.Router();

router.get("/", checkAuthenticated, (req, res) => {
  res.render("registerView.ejs");
});

router.post("/", checkAuthenticated, (req, res) => {
  try {
    let result = registerService.registerUser(req.body);
    if (result.idFilme) {
      res.redirect("/login");
    } else {
      res.redirect("/register");
    }
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
