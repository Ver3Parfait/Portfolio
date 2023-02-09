require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const mailRouter = require('./routes/mailRouter.js')
const skillsRouter = require('./routes/skillsRouter.js')
const loginRouter = require('./routes/loginRouter.js')
const registerRouter = require('./routes/registerRouter.js')
const userRouter = require('./routes/userRouter.js')
const projectsRouter = require('./routes/projectsRouter.js')
const flash = require('connect-flash');
const { array } = require('./CustomDependence/multer.js')

const db = process.env.BDD_URL
const app = express()

app.use(session({secret:"hey",saveUninitialized: true,resave: true}));
app.use(flash())
app.use(express.static('./assets')); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(projectsRouter)
app.use(skillsRouter)
app.use(mailRouter)
app.use(registerRouter)
app.use(userRouter)
app.use(loginRouter)

app.listen(3005,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Connected');
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("Connected to DB");
    }
})