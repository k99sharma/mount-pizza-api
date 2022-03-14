const express = require('express');
const router = express.Router();


// importing middlewares
const { catchErrors } = require('../configs/errorHandlers');

// importing controllers
const pizza = require('../../controllers/Items/pizzas');


// POST: create new pizza
router.post('/create', catchErrors(pizza.createPizza));

// GET: get pizza
router.get('/:id/get', catchErrors(pizza.getPizza));

// GET: get all pizzas
router.get('/getAll', catchErrors(pizza.getAllPizzas));

// PUT: update pizza
router.put('/:id/update', catchErrors(pizza.updatePizza));

// DELETE: delete pizza
router.delete('/:id/delete', catchErrors(pizza.deletePizza));

module.exports = router;