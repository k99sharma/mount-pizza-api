// importing modules
const express = require('express');
const router = express.Router();

// importing controller
const topping = require('../../controllers/Items/toppings');

// POST: create new topping
router.post('/create', topping.createTopping);

// GET: get topping
router.get('/:id/get', topping.getTopping);

// GET: get all toppings
router.get('/getAll', topping.getAllToppings);

// PUT: update topping
router.put('/:id/update', topping.updateTopping);

// DELETE: delete topping
router.delete('/:id/delete', topping.deleteTopping);

module.exports = router;