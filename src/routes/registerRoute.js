import express from "express";
import * as registerService from "../services/registerService.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("registerView.ejs");
});

router.post("/", async (req, res) => {
  try {
    let result = registerService.registerUser(req.body);
    res.status(201).send(result);
  } catch {
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
