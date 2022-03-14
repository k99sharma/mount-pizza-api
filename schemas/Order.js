const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    pizzas: [{
        pizzaID: {
            type: String,
        },
        additionalToppings: [{
            toppingsID: String,
        }],
        quantity: {
            type: Number,
        },
    }],
    customerId: {
        type: String,
        required: true,
    },
    // need to be calculated
    amount: {
        type: Number,
        required: true,
    },
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;