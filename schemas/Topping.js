const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'veg',
    },
    price: {
        type: Number,
        required: true,
    },
});

const topping = mongoose.model('Topping', toppingSchema);

module.exports = topping;