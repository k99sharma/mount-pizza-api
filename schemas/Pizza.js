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
    style: {
        type: String,
        required: true,
        enum: ["CUSTOM", "DEFAULT"],
        default: "DEFAULT",
    },
    price: {
        type: Number,
        required: true,
    },
    crustType: {
        type: String,
        required: true,
        enum: ["SMALL", "MEDIUM", "LARGE"]
    }
},
{
    timeseries: true,
});

const pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = pizza;