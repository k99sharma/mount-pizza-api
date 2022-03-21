const mongoose = require('mongoose');
const Schema = new mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    items: {
        itemId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 0,
        }
    }
},
{
    timestamps: true,
});

const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;