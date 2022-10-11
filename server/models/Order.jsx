const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: String,
    unique: true
  },
  products: [{
    productId: String,
    productName: String,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less that 1'],
      default: 1
    },
    price: Number
  }],
  bill: {
    type: Number,
    required: true,
    default: 0
  },
  date_ordered: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);