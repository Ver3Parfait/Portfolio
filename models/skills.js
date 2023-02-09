const mongoose = require('mongoose')

const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    image:{
        type: String,
        required: [true, "Pas d'image"]
    }
})

const SkillsModel = mongoose.model('Skills', skillsSchema);

module.exports = SkillsModel