const { User } = require("../model/User");
const userData = require("../db/UserDb");

const signup = async (email, username, password) => {
  const user = await User.create({ email, username, password });
  return user;
};

const login = (username, password) => {
  const user = User.findOne({ username, password });
  return user;
};

const updatePassword = (email, password, newPassword) => {
  userData.map((user) => {
    if (user.email == email && user.password == password) {
      user.password = newPassword;
    }
  });
};

const updateName = (email, password, newName) => {
  userData.map((user) => {
    if (user.email == email && user.password == password) {
      user.name = newName;
    }
  });
};

const findUserById = async (userid) => {
  try {
    const user = await User.findById(userid).populate("notes");
    return user;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = (userid) => {
  let new_user = userData.filter((user) => user.userid !== +userid);
  return new_user;
};

module.exports = {
  deleteUser,
  findUserById,
  updateName,
  updatePassword,
  login,
  signup,
};
