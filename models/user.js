const mongoose = require("mongoose");

const userScheme = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      require: true,
      default: "NORMAL",
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("user", userScheme);

module.exports = User;
