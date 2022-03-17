const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId : {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    orderPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now(),
    },
},
{
    timestamps: true,
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;