const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
