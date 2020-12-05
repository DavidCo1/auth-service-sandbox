const config = require('./config/config');
// const http = require('http');

// const hostname = '127.0.0.1';
const port = 1234;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('<h1>Hello World</h1>');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });



const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
console.log('config',config);

passport.use(new GoogleStrategy({
  clientID: config.authProviders.google.clientId,
    clientSecret: config.authProviders.google.clientSecret,
    callbackURL: "http://localhost:1234/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //    return done(err, user);
      //  });
       return done(null, profile);

  }
));


const express = require('express');
const app = express();

app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email', 'profile'] }));


app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}/`);
});

