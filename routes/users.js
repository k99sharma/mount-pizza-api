const express = require('express');
const router = express.Router();

// importing middlewares
const { catchErrors } = require('../configs/errorHandlers');


// importing controllers
const user = require('../controllers/users');


// POST: route to create new user
router.post('/create', catchErrors(user.createUser));

// GET: route to get user using id
router.get('/:id/get', catchErrors(user.getUser));

// GET: route to get all users 
router.get('/getAll', catchErrors(user.getAllUsers));

// PUT: route to update user data
router.put('/:id/update', catchErrors(user.updateUser));

// DELETE: route to delete user data
router.delete('/:id/delete', catchErrors(user.deleteUser));

module.exports = router;