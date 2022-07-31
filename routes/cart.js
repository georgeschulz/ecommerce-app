const express = require('express');
const router = express.Router();
const controllers = require('../controllers/cart');

router.post('/:customer_id/service/:service_id', controllers.addServiceToCart);
router.get('/:customer_id', controllers.getCartContents);
router.delete('/:cart_id', controllers.deleteCartItem);
router.delete('/clear/:customer_id', controllers.clearCart);

module.exports = router;