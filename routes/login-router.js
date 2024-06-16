const express = require("express");
const loginRouter = express.Router();
const UserModel = require("../models/user.js");
const crypto = require("../custom-dependencies/crypto.js");

loginRouter.get("/login", async (req, res) => {
  try {
    res.render("login.twig",{
      messages: req.flash('sucess'),
      email: req.session.email
    });
    req.session.destroy()
  } catch (err) {
    res.send(err);
  }
});

loginRouter.post("/login", async (req, res) => {
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
    });
    if (user) {
      if (await crypto.comparePassword(req.body.password, user.password)) {
         req.session.userPseudo = user.pseudo;
         req.session.userId = user._id;
         res.redirect("/homeUser");
      }else{
        req.session.email = req.body.email;
         res.redirect("/login")
      }
    } else {
      res.render("index.twig");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = loginRouter;
