const User = require("../models/user");

/**
 * Returns the page for the user's profile, corresponds to
 * the API route /profile
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns the page for the user's profile
 */
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

/**
 * Returns the page for signing up a new user, corresponds to
 * the API Route /sign-up
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns the signup page
 */
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "WolfJobs | Sign Up",
  });
};

/**
 * Returns the page for signing in an existing user, corresponds
 * to the API Route /sign-in
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns the sign in page
 */
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "WolfJobs | Sign In",
  });
};

/**
 * Creates a new user using sign up details, corresponds to
 * the API Route /create
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns status message when unable to create a new user or
 * a redirect to the sign in page
 */
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in Signing Up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating a user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

/**
 * Creates a new session for users after sign in, corresponds
 * to the API Route /create-session
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns redirect to /
 */
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

/**
 * Closes a session for users after sign in, corresponds
 * to the API Route /destroy-session
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns redirect to /
 */
module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};

