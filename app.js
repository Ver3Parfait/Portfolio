require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const mailRouter = require('./routes/mail-router.js');
const skillsRouter = require('./routes/skills-router.js');
const loginRouter = require('./routes/login-router.js');
const registerRouter = require('./routes/register-router.js');
const userRouter = require('./routes/user-router.js');
const projectsRouter = require('./routes/projects-router.js');

const db = process.env.BDD_URL;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: "hey",
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(projectsRouter);
app.use(skillsRouter);
app.use(mailRouter);
app.use(registerRouter);
app.use(userRouter);
app.use(loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port', PORT);
    }
});

mongoose.set('strictQuery', false);

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.error('DB Connection Error: ', err);
});
