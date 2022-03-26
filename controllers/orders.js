// importing modules
const Razorpay = require('razorpay');
const crypto = require('crypto');

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
    sendError, sendSuccess
} = require('../utilities/helpers');

// importing status codes
const {
    BAD_REQUEST, NOT_FOUND, SERVER_ERROR
} = require('../utilities/statusCodes');


// function to create new order
const createOrder = async (req, res) => {
    const customer = await User.findOne({ email: req.user.email });
    const { orderPrice } = req.query;

    // check if customer exists
    if (!customer) {
        return sendError(res, 'Customer not found', NOT_FOUND);
    }

    // creating razorpay instance
    const instance = new Razorpay({
        key_id: RZP_KEY_ID,
        key_secret: RZP_KEY_SECRET,
    });

    const options = {
        amount: (orderPrice * 100).toString(),
        currency: 'INR',
        receipt: 'order_rcptid_1',
    }
    // creating an order
    instance.orders.create(options, function (err, order) {
        if (err) {
            return sendError(res, 'Order not placed', BAD_REQUEST);
        }

        return sendSuccess(res, order);
    })
}


// function to verify payment
const verifyPayment = async (req, res) => {
    let body = req.body.razorpayOrderId + "|" + req.body.razorpayPaymentId;
    var expectedSignature = crypto.createHmac('sha256', RZP_KEY_SECRET).update(body.toString()).digest('hex');

    if (expectedSignature !== req.body.razorpaySignature) {
        return sendError(res, 'Signature not valid', BAD_REQUEST);
    }

    return sendSuccess(res, { "signatureIsValid": "true" });
}



module.exports = {
    createOrder,
    verifyPayment
};