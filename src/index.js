const config = require('./config/config');

// const hostname = '127.0.0.1';
const port = 1234;


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter');
const FacebookStrategy = require('passport-facebook');
console.log('config',config);

passport.use(new GoogleStrategy({
  clientID: config.authProviders.google.clientId,
    clientSecret: config.authProviders.google.clientSecret,
    callbackURL: "http://localhost:1234/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile);
    
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //    return done(err, user);
      //  });
       return done(null, profile);

  }
));

passport.use(new TwitterStrategy({
    consumerKey: config.authProviders.twitter.clientId,
    consumerSecret: config.authProviders.twitter.clientSecret,
    callbackURL: "http://localhost:1234/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile);
    
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //    return done(err, user);
      //  });
       return done(null, profile);

  }
));

passport.use(new FacebookStrategy({
  clientID: config.authProviders.facebook.clientId,
  clientSecret: config.authProviders.facebook.clientSecret,
  callbackURL: "http://localhost:1234/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  //console.log(profile);
  
    //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //    return done(err, user);
    //  });
     return done(null, profile);

}
));


const express = require('express');
const app = express();


app.use(require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));


app.use(express.static('public'));



app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/secure', function (req, res) {
  if (!req.user){
    res.redirect('/');
  }
  let message = `hi ${req.user.displayName}`
  res.send(message);
});

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secure');
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email', 'profile'] }));


  app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secure');
  });

app.get('/auth/twitter',
  passport.authenticate('twitter', { scope: [ 'email', 'profile'] }));


  
  app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secure');
  });

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: [] }));




app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}/`);
});

