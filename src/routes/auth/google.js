module.exports = function (app) {
  const config = require.main.require("./config/config");
  const passport = require("passport");

  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.authProviders.google.clientId,
        clientSecret: config.authProviders.google.clientSecret,
        callbackURL: "http://localhost:1234/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/secure");
    }
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login", "email", "profile"],
    })
  );
};
