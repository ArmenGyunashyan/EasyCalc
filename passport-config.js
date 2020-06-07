const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
    passport.use(new LocalStrategy(function(username) {

    }));

    passport.serializeUser(function(user, done) {

    });
    passport.deserializeUser(function(user, done) {
        
    });
}