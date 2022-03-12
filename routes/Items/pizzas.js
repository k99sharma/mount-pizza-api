const express = require('express');
const router = express.Router();

const pizza = require('../../controllers/Items/pizzas');

// POST: create new pizza
router.post('/create', pizza.createPizza);

// GET: get pizza
router.get('/:id/get', pizza.getPizza);

// GET: get all pizzas
router.get('/getAll', pizza.getAllPizzas);

// PUT: update pizza
router.put('/:id/update', pizza.updatePizza);

// DELETE: delete pizza
router.delete('/:id/delete', pizza.deletePizza);

module.exports = router;