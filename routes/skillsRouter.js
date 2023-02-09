const express = require("express");
const skillsRouter = express.Router();
const SkillsModel = require('../models/skills.js')
const adminGuard = require("../CustomDependence/AdminGuard.js");
const upload = require('../CustomDependence/multer.js')

skillsRouter.get("/addSkills",adminGuard, async (req, res) => {
  try {
    res.render("addSkills.twig");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


skillsRouter.post('/addSkills',adminGuard, upload.single('image'), async (req, res) => {
  try {
      req.body.image = req.file.filename
      let skill = new SkillsModel(req.body)
      await skill.save()
      res.redirect("/addSkills")
  } catch (err) {
    console.log(err);
      res.send(err);
  }
})


module.exports = skillsRouter;
