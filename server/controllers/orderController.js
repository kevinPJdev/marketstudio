const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const config = require('config');
const stripe = require('stripe')(config.get('stripeTestKey'));

const getOrders = (req, res) => {
  Order.findOne({userId: req.params.id}).sort({date: -1})
    .then(order => {
      if(!order) return res.status(400).json({msg: "No orders for this user"});
      return res.status(200).send(order);
    })
    .catch(err => {
      return res.status(500).json({msg: "Something went wrong"});
    })
}

const checkout = async(req, res) => {
  const userId = req.params.id;
  const {source} = req.body;
  try {
    let cart = await Cart.findOne({userId});
    let user = await User.findOne({_id: userId});
    const email = user.email;
    if(cart) {
      const charge = await stripe.charges.create({
        amount: cart.bill,
        currency: 'cad',
        source: source,
        receipt_email: email
      })

      if(!charge) throw Error('Payment failed!');

      if(charge) {
        const order = await Order.create({
          userId,
          products: cart.products,
          bill: cart.bill
      });

      const data = await Cart.findByIdAndDelete({_id:cart.id});
      return res.status(201).send(order);
      }
    } else {
        return res.status(500).json({msg: "You do not have items in cart"});
    } 
  } catch(err) {
      console.log(err);
      return res.status(500).json({msg: "Something went wrong"})
  }
}

module.exports = {getOrders, checkout};