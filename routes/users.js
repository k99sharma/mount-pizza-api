const express = require('express');
const router = express.Router();

// importing controllers
const user = require('../controllers/users');

// POST: route to create new user
router.post('/create', user.createUser);

// GET: route to get user using id
router.get('/:id/get', user.getUser);

// GET: route to get all users 
router.get('/getAll', user.getAllUsers);

// PUT: route to update user data
router.put('/:id/update', user.updateUser);

// DELETE: route to delete user data
router.delete('/:id/delete', user.deleteUser);

module.exports = router;