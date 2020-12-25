module.exports = function (app) {
  require("./auth/facebook")(app);
  require("./auth/google")(app);
  require("./auth/twitter")(app);

  app.get("/secure", function (req, res) {
    if (!req.user) {
      res.redirect("/");
    }
    let message = `hi ${req.user.displayName}`;
    res.send(message);
  });
};
