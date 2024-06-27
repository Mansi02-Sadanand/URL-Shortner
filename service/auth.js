// const sessionIdUserToMap = new Map();

// function setUser(id, user) {
//   sessionIdUserToMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdUserToMap.get(id);
// }

// module.exports = {
//   setUser,
//   getUser,
// };

const jwt = require("jsonwebtoken");
const secrete = "mansi@";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secrete
  );
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secrete);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};

/** be cautious about token dont sharee it  with anyone*/
