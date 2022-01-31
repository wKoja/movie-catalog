const express = require("express");
const router = express.Router();
const registerService = require("../services/registerService");

router.get("/", (req, res) => {
  res.render("registerView.ejs");
});

router.post("/", (req, res) => {});

module.exports = router;
