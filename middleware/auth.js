const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(role = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/signin");

    if (!role.includes(req.user.role)) return res.end("unauthorised");

    return next();
  };
}

module.exports = { restrictTo, checkForAuthentication };
