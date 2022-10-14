const Cart = require('../models/Cart');

const getCartItems = (req, res) => {
  Cart.findOne({userId: req.params.id})
    .then(cart => {
      if(cart && cart.products.length>0) {
        res.status(200).json(cart);
      } else {
        res.send(null);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({msg: "Something went wrong"});
    })
}

const postCardItems = (req, res) => {
  const { productId, quantity } = req.body;

  Cart.findOne
}

module.exports = {getCartItems}