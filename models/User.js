//create a mongoose schema for Users
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
//export the model to use it in index.js
const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
