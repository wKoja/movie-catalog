import express from "express";
const router = express.Router();
import * as registerService from "../services/registerService.js";

router.get("/", (req, res) => {
  res.render("registerView.ejs");
});

router.post("/", (req, res) => {
  try {
    let result = registerService.registerUser(req.body);
    res.status(201).send(result);
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
