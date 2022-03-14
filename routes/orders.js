// importing modules
const express = require('express')
const router = express.Router();

// importing controllers
const order = require('../controllers/orders');

// POST: create an new order
router.post('/create', order.createOrder);

// DELETE: delete order
router.delete('/:id/delete', order.deleteOrder);

// GET: get order
router.get('/:id/get', order.getOrder);

// PUT: update an order
router.put('/:id/update', order.updateOrder);

module.exports = router;