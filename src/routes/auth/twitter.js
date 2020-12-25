module.exports = function (app) {
  const config = require.main.require("./config/config");
  const passport = require("passport");

  const TwitterStrategy = require("passport-twitter");

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: config.authProviders.twitter.clientId,
        consumerSecret: config.authProviders.twitter.clientSecret,
        callbackURL: "http://localhost:1234/auth/twitter/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/secure");
    }
  );

  app.get(
    "/auth/twitter",
    passport.authenticate("twitter", { scope: ["email", "profile"] })
  );
};
