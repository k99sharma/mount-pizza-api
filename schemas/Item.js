const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    pizzaId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
});

const item = mongoose.model('Item', itemSchema);

module.exports = item;