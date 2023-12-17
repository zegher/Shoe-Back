//create a mongoose schema for Users
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Userschema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //add email, shoe-size, adress, country
  email: {
    type: String,
    required: true,
  },
  shoeSize: {
    type: Number,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  
});
//export the model to use it in index.js
const Users = mongoose.model('Users', Userschema);
module.exports = Users;
