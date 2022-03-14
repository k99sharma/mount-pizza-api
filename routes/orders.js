// importing modules
const express = require('express')
const router = express.Router();

// importing middlewares
const { catchErrors } = require('../configs/errorHandlers');

// importing controllers
const order = require('../controllers/orders');

// POST: create an new order
router.post('/create', catchErrors(order.createOrder));

// DELETE: delete order
router.delete('/:id/delete', catchErrors(order.deleteOrder));

// GET: get order
router.get('/:id/get', catchErrors(order.getOrder));

// PUT: update an order
router.put('/:id/update', catchErrors(order.updateOrder));

module.exports = router;