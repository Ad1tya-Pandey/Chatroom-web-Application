const jwt = require("jsonwebtoken");
//aes 256
// privat key and public key
// refresh token in jwt , module of authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
