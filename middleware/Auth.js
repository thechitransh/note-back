const { User } = require("../model/User");
const Auth = (req, res, next) => {
  const { userid } = req.query;
  if (!userid) {
    res.status(400).json({ message: "Unauthorised" });
  } else {
    const user = User.findById(userid);
    if (user) {
      next();
    } else {
      res.status(404).json({ message: "No user found" });
    }
  }
};

module.exports = { Auth };
