const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");
const {} = require("cookie");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("signin", { error: "Invalid email or password" });
  }

  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  const token = setUser(user);

  // res.cookie("uid", sessionId);
  res.cookie("token", token);

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserSignin,
};