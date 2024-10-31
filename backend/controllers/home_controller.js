/**
 * Returns the home page for Wolf Jobs, corresponds to
 * the API Route /controllers/home_controller
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns the home page for WolfJobs
 */
module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};
