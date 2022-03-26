// importing modules
const express = require('express');
const router = express.Router();

// importing controllers
const cart = require('../controllers/cart');

// importing authentication middlewares
const {
    adminAuth,
    allAuth
} = require('../middlewares/auth');

// POST: route to add items in cart
router.post('/add', allAuth, cart.addItems);

// GET: route to get items from cart

// PUT: route to update items in cart

// DELETE: route to delete items from cart


module.exports = router;