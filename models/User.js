//create a mongoose schema for shoes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShoeSchema = new Schema({
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
const Shoes = mongoose.model('Shoes', ShoeSchema);
module.exports = Shoes;
