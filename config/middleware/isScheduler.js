module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user.Group.type === 'admin' || req.user.Group.type === 'scheduler') {
    return next();
  }

  // If the user isnt' logged in, redirect them to the login page
  return res.redirect("/login");
};