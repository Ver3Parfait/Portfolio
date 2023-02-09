const mongoose = require('mongoose')

const projectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    link: {
        type: String,
        required: [true, 'Pas de lien'],
    },
    image:{
        type: String,
        required: [true, "Pas d'image"]
    }
})

const ProjectsModel = mongoose.model('Projects', projectsSchema);

module.exports = ProjectsModel