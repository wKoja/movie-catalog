const express = require("express");
const router = express.Router();
const loginService = require("../services/loginService");

router.get("/", (req, res) => {
  res.render("loginView.ejs");
});

module.exports = router;
