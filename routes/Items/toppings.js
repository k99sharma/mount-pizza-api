// importing modules
const express = require('express');
const router = express.Router();

// importing middlewares
const { catchErrors } = require('../configs/errorHandlers');

// importing controller
const topping = require('../../controllers/Items/toppings');

// POST: create new topping
router.post('/create', catchErrors(topping.createTopping));

// GET: get topping
router.get('/:id/get', catchErrors(topping.getTopping));

// GET: get all toppings
router.get('/getAll', catchErrors(topping.getAllToppings));

// PUT: update topping
router.put('/:id/update', catchErrors(topping.updateTopping));

// DELETE: delete topping
router.delete('/:id/delete', catchErrors(topping.deleteTopping));

module.exports = router;