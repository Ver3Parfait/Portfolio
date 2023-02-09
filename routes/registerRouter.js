const express = require("express");
const registerRouter = express.Router();
const UserModel = require("../models/user.js");
const crypto = require("../CustomDependence/crypto.js");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const Token = require("../assets/js/token.js");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fonsat.nodemailer@gmail.com",
    pass: "dlclhbrybfcawlgi",
  },
});

registerRouter.get("/register", async (req, res) => {
  try {
    res.render("register.twig");
  } catch (err) {
    res.send(err);
  }
});

registerRouter.post(
  "/register",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email inexistante")
      .normalizeEmail()
      .toLowerCase(),
    body("password")
      .trim()
      .isLength(8)
      .withMessage("Mot de passe trop court !"),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Les mots de passe ne corresponde pas !");
      }
      return true;
    }),
  ],
  async (req, res) => {
    try {
      req.session.token = "";
      const errors = validationResult(req);
      let userMail = await UserModel.findOne({
        email: req.body.email,
      });
      let userPseudo = await UserModel.findOne({
        pseudo: req.body.pseudo,
      });
      if (!errors.isEmpty()) {
        console.log(errors);
        errors.array().forEach((error) => {
          req.flash("error", error.msg);
        });
        res.render("register.twig", {
          message: req.flash("error"),
          fname: req.body.firstname,
          name: req.body.name,
          email: req.body.email,
          pseudo: req.body.pseudo,
        });
        return;
      }
      if (userPseudo || userMail) {
        if (userPseudo && userMail) {
          req.session.message = "Pseudo et Email déja existant !";
          res.render("register.twig", {
            message: req.session.message,
            fname: req.body.firstname,
            name: req.body.name,
            email: req.body.email,
            pseudo: req.body.pseudo,
          });
          return;
        } else if (userMail) {
          req.session.message = "E-mail déja existante !";
          res.render("register.twig", {
            message: req.session.message,
            fname: req.body.firstname,
            name: req.body.name,
            email: req.body.email,
            pseudo: req.body.pseudo,
          });
          return;
        } else if (userPseudo) {
          req.session.message = "Pseudo déja existant !";
          res.render("register.twig", {
            message: req.session.message,
            fname: req.body.firstname,
            name: req.body.name,
            email: req.body.email,
            pseudo: req.body.pseudo,
          });
          return;
        }
        return;
      } else {
        let info = await transporter.sendMail({
          from: "lucas.militello12@gmail.com",
          to: req.body.email,
          subject: "Code de confirmation d'inscription .",
          text: `Voici votre code de confirmation pour vérifier l'existance de votre mail.\n\n"Code":\n${(req.session.tokenFirst =
            Token())}\n\nRentrez ce code dans le champ "Vérification" pour confirmer votre adresse e-mail !\n\nMerci d'avance !`,
        });
        req.session.token = req.session.tokenFirst;
        req.session.tokenFirst = "";
        req.session.password2 = await crypto.cryptPassword(req.body.password);
        req.session.password = await crypto.cryptPassword(req.body.password);
        req.session.firstname = req.body.firstname;
        req.session.name = req.body.name;
        req.session.pseudo = req.body.pseudo;
        req.session.email = req.body.email;
        res.render("registerConfirm.twig", {
          user: req.body
        });
        return;
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);

registerRouter.post("/registerConfirm", async (req, res) => {
  try {
    if (req.session.token == req.body.token) {
      req.session.token = "";
      let user = new UserModel({
        email: req.session.email,
        pseudo: req.session.pseudo,
        name: req.session.name,
        firstname: req.session.firstname,
        password: req.session.password,
      });
      user.save();
      req.flash("sucess", "Vous avez bien été enregistrer !");
      res.redirect("/login");
    } else {
      res.render("registerConfirm.twig", {
        message: req.flash("error"),
        email: req.session.email,
        pseudo: req.session.pseudo,
        name: req.session.name,
        firstname: req.session.firstname,
        password: req.session.password,
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = registerRouter;
