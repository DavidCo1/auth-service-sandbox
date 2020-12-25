module.exports = function (app) {
  const config = require.main.require("./config/config");
  const passport = require("passport");

  const FacebookStrategy = require("passport-facebook");

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.authProviders.facebook.clientId,
        clientSecret: config.authProviders.facebook.clientSecret,
        callbackURL: "http://localhost:1234/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, done) {

        return done(null, profile);
      }
    )
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/secure");
    }
  );

  app.get("/auth/facebook", passport.authenticate("facebook", { scope: [] }));
};
