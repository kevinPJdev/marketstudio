const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categoryEnum = require('../data/categories');

const ProductSchema = new Schema({
  product_id: {
    type: String,
    required: true,
    unique: true
  },
  product_name: {
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

module.exports = product = mongoose.model('product', ProductSchema);