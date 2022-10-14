const Order = require('../models/Order');

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

const checkout = (req, res) => {
  
}

module.exports = {getOrders};