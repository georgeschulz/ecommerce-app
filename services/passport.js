const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db');
const queries = require('../queries');

//create the passport local strategy
passport.use(new LocalStrategy(function verify(username, password, cb) {
    //query the databse to find if a customer matches the submitted email, used as a username
    db.query(queries.checkUserAuth, [username], function (err, result) {
        //handle errors and mismatches
        if(err) return cb(err) 
        if(result.rows.length <= 0) return cb(null, false, { message: 'Incorrect username or password'}) 
        //if it passes the checks to make sure the customer exists, check the password
        bcrypt.compare(password, result.rows[0].password, function (err, check) {
            if(err) {
                //handle basic errors
                return cb();
            } else if (check) {
                //this code runs if the authorization is successful
                console.log('Authorized successfully');
                //this returns the customer ID at the moment
                return cb(null, {customerID: result.rows[0].customer_id})
            } else {
                //this part of the code runs when the user matches, but they use the wrong password
                console.log('Incorrect password');
                return cb(null, false);
            }
        })
    })
}))

//serialize the user
passport.serializeUser(function(user, done) {
    done(null, user);
})

//deserialize the user
passport.deserializeUser(function(user, done) {
    done(null, user);
})