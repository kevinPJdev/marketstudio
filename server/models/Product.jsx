const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//categoryEmun defines all our existing categories
const categoryEnum = require('../data/categories');

//create our product schema
const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: categoryEnum
  },
  price: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    required: true,
    default: Date.now
  }
});

//create mongoose model. The mongoose.model() function of the mongoose module is used to create a collection of a particular database of MongoDB.
module.exports = product = mongoose.model('product', ProductSchema);