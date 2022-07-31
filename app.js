require('dotenv').config(); //this adds in the envirornment variables
const express = require('express');
const app = express();
const port = process.env.PORT;
const registerRouter = require('./routes/auth').registerRouter;
const loginRouter = require('./routes/auth').loginRouter;
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');
const passport = require('passport'); //passport library to initialize it
const session = require('express-session'); //creates a session
require('./services/passport'); //passport configuration that allows passport to lookup information in db and compare it to user submissions

app.use(express.json()); //parses json data submitted and sent
app.use(require('cookie-parser')()); // this middleware parses cookies sent with HTTP requests

//setup an express session
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        cookie: { maxAge: 172000000 },
        saveUninitialized: false,
        resave: false,
        sameSite: 'none',
        secure: true
    })
);

//Passport configuration; boilerplate code that adds passport as middlware
app.use(passport.initialize());
app.use(passport.session());

//add routes as middleware
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/services', servicesRouter);

//auth testing route to represent reaching account after success in auth
app.get('/account', (req, res) => {
    res.send('Account page');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}) 