const express = require('express');
const router = express.Router();
const controllers = require('../controllers/cart');

router.post('/:customer_id/service/:service_id', controllers.addServiceToCart);

module.exports = router;