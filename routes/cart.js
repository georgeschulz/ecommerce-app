const express = require('express');
const router = express.Router();
const controllers = require('../controllers/cart');

//routes for cart. An instance of router is used and exported. The controller functions are imported and used as callback options by using the properties in the controllers object
router.post('/:customer_id/service/:service_id', controllers.addServiceToCart);
router.get('/:customer_id', controllers.getCartContents);
router.delete('/:cart_id', controllers.deleteCartItem);
router.delete('/clear/:customer_id', controllers.clearCart);
router.post('/:customer_id/checkout', controllers.checkout);

module.exports = router;