import express from "express";
import passport from "passport";
import {
  initializePassport,
  checkAuthenticated,
} from "../services/loginService.js";
const router = express.Router();

initializePassport(passport);

router.get("/", checkAuthenticated, (req, res) => {
  res.render("loginView.ejs");
});

//everything is handled by passport lib configured in the loginService.js
router.post(
  "/",
  checkAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

export default router;
