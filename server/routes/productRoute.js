const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const { route } = require('./authRoute');

router.get('/products', productController.getProduct);
router.post('/products', productController.postProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

mocdule.exports = router;