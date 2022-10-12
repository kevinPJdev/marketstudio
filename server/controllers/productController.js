const Product = require('../models/Product');

const getProducts = (req, res) => {
  Product.find().sort({date: -1})
    .then(products => {
      res.status(200).json(products);
    })
}

const postProduct = (req, res) => {
  const {productName, description, category, price} = req.body;

  if(!productName || !description || !category || !price) {
    return res.status(400).json({msg: "Product fields missing."})
  }

  const newProduct = new Product({productName, description, category, price});

  newProduct.save()
    .then(product => {
      res.json(product);
    })
}

const updateProduct = () => {
  Product.findByIdAndUpdate({
    _id: req.params.id,
  }, req.body)
    .then(product => {
      Product.findOne({_id: req.params.id})
        .then(product => {
          res.status(201).json(product);
        })
    })
}

const deleteProduct = () => {
  Product.findByIdAndDelete({_id: req.params.id})
    .then(product => {
      res.json({success: true});
    })
}

module.exports = {getProducts, postProduct, updateProduct, deleteProduct};