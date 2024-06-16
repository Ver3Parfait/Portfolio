const express = require("express");
const projectsRouter = express.Router();
const ProjectsModel = require('../models/projects.js')
const adminGuard = require("../custom-dependencies/admin-guard.js");
const upload = require('../custom-dependencies/multer.js')

projectsRouter.get("/addProjects",adminGuard, async (req, res) => {
  try {
    res.render("addProjects.twig");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


projectsRouter.post('/addProjects',adminGuard, upload.single('image'), async (req, res) => {
  try {
      req.body.image = req.file.filename
      let project = new ProjectsModel(req.body)
      await project.save()
      res.redirect("/addSkills")
  } catch (err) {
    console.log(err);
      res.send(err);
  }
})


module.exports = projectsRouter;
