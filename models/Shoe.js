//create a mongoose schema for shoes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShoeSchema = new Schema({
  brand: String,
  color: String,
  lacesColor: String,
  soleColor: String,
  logoColor: String,
  size: Number,
  price: Number,
});
//export the model to use it in index.js
module.exports = mongoose.model('Shoe', ShoeSchema);
