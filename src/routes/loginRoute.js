import express from "express";
const router = express.Router();
//import * as loginService from "../services/loginService";

router.get("/", (req, res) => {
  res.render("loginView.ejs");
});

router.post("/", (req, res) => {});

export default router;
