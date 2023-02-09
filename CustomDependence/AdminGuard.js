const UserModel = require("../models/user.js")

let adminGuard = async (req,res,next) => { //C'est un middleware qui permettra de verifier si l'utilisateur est connecté ou non
    let user = await UserModel.findOne({_id: req.session.userId})
    if (user) {
      if (user.status == 1) {
        next()
      }else{
        res.redirect('/login')

      }
    }else{
        res.redirect('/login')
    }
}



module.exports = adminGuard