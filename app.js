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

const app = express();

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes paths


module.exports = app;
