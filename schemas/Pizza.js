const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    toppings: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});


const pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = pizza;