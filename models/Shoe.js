//create a mongoose schema for shoes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShoeSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  lacesColor: {
    type: String,
    required: true,
  },
  soleColor: {
    type: String,
    required: true,
  },
  logoColor: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//export the model to use it in index.js
const Shoes = mongoose.model('Shoes', ShoeSchema);
module.exports = Shoes;
