const Cart = require('../models/Cart');
const Product = require('../models/Product');

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

const postCartItems = async(req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({userId: req.params.id});
    let product = await Product.findOne({_id: productId});
    if(!product) {
      res.status(400).json({msg: "Product not found"});
    }
    const name = product.productName;
    const price = product.price;

    if(cart) {
      //add an item to cart
      let productIndex = cart.products.findIndex(p => p.productId === productId);

      if(productIndex > -1) {
        let productItem = cart.products[productIndex];
        productItem.quantity += quantity;
        cart.products[productIndex] = productItem;
      } else {
        cart.products.push({productId, name, quantity, price});
      }
      cart.bill += quantity*price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } 
    else {
      //create a new cart
      const newCart = Cart.create({
        userId,
        products: [{productId, name, quantity, price}],
        bill: quantity * price
      });
      return res.status(201).send(newCart);
    }
  } catch(err) {
    console.log(err);
    return res.status(500).json({msg: "Something went wrong!"});
  }
}

const deleteItem = async(req, res) => {
  const productId = req.params.id;
  const userId = req.params.userId;

  //check if the item exists in cart
  try {
    let cart = await Cart.findOne({userId: userId});

    if(cart) {
      const productIndex = cart.products.findIndex(p => p.productId === productId);

      if(productIndex > -1) {
        let productItem = cart.products[productIndex];
        cart.bill -= productItem.quantity * productItem.price;
        cart.products.splice(productIndex, 1);
      } else {
        //Item does not exist in cart
        return res.status(400).send({msg: "Product does not exist in this cart"});
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } 
    else {
      return res.status(400).json({msg: "Cart was not found"});
    }
  } catch(err) {
    return res.status(500).json({msg: "Something went bad"});
  }
}

module.exports = {getCartItems, postCartItems, deleteItem}