const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    pseudo: {
        type: String,
        required: [true, 'Veuillez rentrez un pseudo !']
    },
    firstname: {
        type: String,
        required: [true, 'Pas de prénom'],
    },
    email: {
        type: String,unique: true,lowercase:true,
        required: [true, 'Pas de mail'],
        validate: {
            validator: function(v) {
                return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    password: {
        type: String,
        required: [true, 'Pas de mot de passe']
    },
    status: {
        type:Number,
        default:0
    },
    active: {
        type: String,
        default: false
    },
    token: {
        type: String,
    }
})

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel