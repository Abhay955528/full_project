const jwt = require("jsonwebtoken");
const User = require('../models/user');

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log('TOKEN>>>>',token);
    const user = jwt.verify(token, "secretKey");
    User.findById(user.userId).then((user) => {
      //! very impotent line
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false });
  }
};

module.exports = {
  authenticate,
};