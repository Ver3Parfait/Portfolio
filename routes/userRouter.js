const express = require("express");
const userRouter = express.Router();
const routeGuard = require("../CustomDependence/AuthGuard.js");
const SkillsModel = require("../models/skills.js");
const ProjectsModel = require("../models/projects.js");
const UserModel = require("../models/user.js");

userRouter.get("/", async (req, res) => {
  try {
    res.redirect('/home')
  } catch (err) {
    res.send(err);
  }
});

userRouter.get("/home", async (req, res) => {
  try {
    let skills = await SkillsModel.find();
    let projects = await ProjectsModel.find();
    res.render("index.twig", {
      projects: projects,
      skills: skills,
    });
  } catch (err) {
    res.send(err);
  }
});

userRouter.get("/homeUser", routeGuard, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.session.userId });
    let skills = await SkillsModel.find();
    let projects = await ProjectsModel.find();
    if (user.status == 1) {
      res.render("AdminPage.twig", {
        userPseudo: req.session.userPseudo,
        projects: projects,
        skills: skills,
      });
    }else{
      res.render("indexUser.twig", {
        userPseudo: req.session.userPseudo,
        projects: projects,
        skills: skills,
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = userRouter;
