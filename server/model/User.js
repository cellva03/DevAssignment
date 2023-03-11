const mongoose = require("mongoose");

const schema = new mongoose.Schema();

const userSchema = {
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  confirm_password: {
    type: String,
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
