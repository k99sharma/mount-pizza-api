// importing modules
const Razorpay = require('razorpay');

// importing schemma
const Order = require('../schemas/Order');
const Pizza = require('../schemas/Pizza');
const Topping = require('../schemas/Topping');
const User = require('../schemas/User');

// importing constants
const {
    RZP_KEY_ID,
    RZP_KEY_SECRET
} = require('../configs/index');

// importing error handlers
const { 
    sendError, sendSuccess, calculateOrderPrice 
} = require('../utilities/helpers');

// importing status codes
const { 
    BAD_REQUEST, NOT_FOUND, SERVER_ERROR
} = require('../utilities/statusCodes');


// function to create new order
const createOrder = async (req, res) => {
    const customerId = req.params.id;

    // check if customer id exists
    const customer = await User.findOne({ _id: customerId });
    if(!customer)
        return sendError(res, 'User do not exist', BAD_REQUEST);

    console.log(req.body);

                                                    // ALL THE PRICE CALCULATION WILL BE DONE AT FRONTEND ONLY 

                                                    // TODO: AFTER FRONTEND ---> PAYMENT INTEGRATION

    // RAZORPAY PAYMENT GATEWAY INTEGRATION
    // instantiate razorpay instance
    const instance = new Razorpay({
        key_id: RZP_KEY_ID,
        key_secret: RZP_KEY_SECRET,
    })

    const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "rcp1"
    };
    
    instance.orders.create(options, (err, order) => {
        if(err){
            return sendError(res, 'Order cannot be generated', SERVER_ERROR);
        }

        return sendSuccess(res, {
            orderId: order.id,
        });
    })

    // saving orderId in customer
    // await User.findByIdAndUpdate(customerId, {
    //     $push: {
    //         orderHistory: newOrder._id,
    //     }
    // })

    // saving new order
    // await newOrder.save();
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