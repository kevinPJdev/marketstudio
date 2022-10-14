const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/order/:id', orderController.getOrders);
router.post('/order/checkout', orderController.checkout);

module.exports = router;