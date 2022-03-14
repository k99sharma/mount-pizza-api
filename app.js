// importing modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// database configuration
mongoose.connect('mongodb://localhost:27017/mount-pizza')
    .then(()=>{
        console.log('Database Connected!');
    })
    .catch(err => {
        console.log(err);
    })

// importing routes
const usersRouter = require('./routes/users');
const toppingRouter = require('./routes/Items/toppings');
const pizzaRouter = require('./routes/Items/pizzas');
const orderRouter = require('./routes/orders');

const app = express();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes paths
app.use('/mountpizza/users', usersRouter);
app.use('/mountpizza/items/toppings', toppingRouter);
app.use('/mountpizza/items/pizzas', pizzaRouter);
app.use('/mountpizza/orders', orderRouter);

module.exports = app;
