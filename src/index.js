const config = require("./config/config");
const passport = require("passport");

// const hostname = '127.0.0.1';
const port = 1234;

console.log("config", config);

const express = require("express");
const app = express();

app.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

require("./routes")(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
