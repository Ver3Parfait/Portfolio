const express = require("express");
const mailRouter = express.Router();
const nodemailer = require('nodemailer');
const UserModel = require("../models/user.js");
const transporter = nodemailer.createTransport({
   service : 'gmail',
   auth : {
      user: "fonsat.nodemailer@gmail.com",
      pass: "dlclhbrybfcawlgi",
   }
})

mailRouter.post('/sendMail', async (req, res) =>{
   try{
      let user = await UserModel.findOne({ _id: req.session.userId });
      let info = await transporter.sendMail({
         from: req.body.email,
         to: "militellolucas@icloud.com",
         subject: req.body.email,
         text: `${req.body.name}\n${req.body.message}`,
      })
      if (user) {
         res.redirect('/homeUser')
      }else{
         res.redirect('/home')
      }
   }catch (err){
      console.log(err);
      res.send(err)
   }
})

module.exports = mailRouter
