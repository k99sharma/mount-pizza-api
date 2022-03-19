// importing schemma
const Order = require('../schemas/Order');
const Pizza = require('../schemas/Pizza');
const Topping = require('../schemas/Topping');
const User = require('../schemas/User');

// importing error handlers
const { 
    sendError, sendSuccess 
} = require('../utilities/helpers');

// importing status codes
const { 
    BAD_REQUEST, NOT_FOUND
} = require('../utilities/statusCodes');


// function to create new order
const createOrder = async (req, res) => {
    const customerId = req.params.id;

    const {
        items
    } = req.body;

    // check if customer id exists
    const customer = await User.findOne({ _id: customerId });
    if(!customer)
        return sendError(res, 'User do not exist', BAD_REQUEST);

    // calculating price of items
    let price = 0;
    for(let i=0; i<items.length; i++){
        const pizzaId = items[i].pizzaId;
        const quantity = items[i].quantity;

        const pizza = await Pizza.findById(pizzaId);
        console.log(pizza);
        price += pizza.price;
        price *= quantity;
    }

    const newOrder = new Order({
        customerId: customerId,
        items: items,
        orderPrice: price,
        orderDate: new Date(Date.now()).toISOString(),
    });

    // saving orderId in customer
    await User.findByIdAndUpdate(customerId, {
        $push: {
            orderHistory: newOrder._id,
        }
    })

    await newOrder.save();

    return sendSuccess(res, newOrder);
}

// function to get order using id
const getOrder = async (req, res) => {
    const orderId = req.params.id;

    // checking if order exists
    const order = await Order.findById(orderId);
    if(!order)
        return sendError(res, "Order not found", NOT_FOUND);

    return sendSuccess(res, order);
}

// TODO
// function to update order
// const updateOrder = async (req, res) => {}

// // function to delete order
// const deleteOrder = async (req, res) => {}


module.exports = {
    createOrder,
    getOrder,
    // updateOrder,
    // deleteOrder
};