const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');

router.get('/', controllers.getUsers);
router.get('/:id', controllers.getUserById);
router.put('/:id', controllers.updateUserById);

module.exports = router;