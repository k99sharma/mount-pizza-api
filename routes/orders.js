// importing modules
const express = require('express')
const router = express.Router();

// importing middlewares
const { catchErrors } = require('../configs/errorHandlers');

// importing authentication middlewares
const {
    adminAuth,
    allAuth
} = require('../middlewares/auth');

// importing controllers
const order = require('../controllers/orders');

// POST: create an new order
router.post('/:id/create', allAuth, catchErrors(order.createOrder));

// GET: get order
router.get('/:id/get', allAuth, catchErrors(order.getOrder));


// TODO
// // DELETE: delete order
// router.delete('/:id/delete', catchErrors(order.deleteOrder));

// // PUT: update an order
// router.put('/:id/update', catchErrors(order.updateOrder));

module.exports = router;