// User model to authenticate Blog owner with a username and password
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, requried: true },
});

module.exports = mongoose.model("User", UserSchema);
