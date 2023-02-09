const UserModel = require("../models/user.js")

let routeGuard = async (req,res,next) => { //C'est un middleware qui permettra de verifier si l'utilisateur est connecté ou non
    let user = await UserModel.findOne({_id: req.session.userId})
    if (user) {
        next() // permet de passer au middleware suivant. en l'occurence dans ce projet, le corps de la route (middleware final)
    }else{
        res.redirect('/login')
    }
}



module.exports = routeGuard