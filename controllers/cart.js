// importing models
const CartSession = require('../schemas/cartSession');
const Cart = require('../schemas/Cart');

// importing error handlers
const {
    sendError,
    sendSuccess,
} = require('../utilities/helpers');

// importing status codes
const { SERVER_ERROR, NOT_FOUND } = require('../utilities/statusCodes');
const User = require('../schemas/User');


// cb: add items to cart
module.exports.addItems = async (req, res) => {
    const customerId = req.params.id;
    const { itemId, quantity } = req.query;

    // checking if customer exists or not
    const customer = await User.findById(customerId);
    if(!customer)
        return sendError(res, 'Customer not found', NOT_FOUND);

    // check if there is already a session running for customer
    const session = await CartSession.findOne({ customerId: customerId });

    // if session is present
    if(session){
        // get the session id
        const sessionId = session._id;
        // create new cart item
        const newCartItem = new Cart({
            sessionId: sessionId,
            itemId: itemId,
            quantity: quantity,
        });

        // save item
        await newCartItem.save()
            .then(()=>{
                console.log('Item in cart saved');
            })
            .catch(err => {
                return sendError(res, 'Item cannot be saved in cart', SERVER_ERROR);
            })
    }
    // if session is not present
    else{
        // create new session for user
        const session = new CartSession({
            customerId: customerId,
        });


        // saving newly created session
        await session.save()
            .then(async (session)=>{
                // session id
                const sessionId = session._id;
                
                // creating new item for this session
                const newCartItem = new Cart({
                    sessionId: sessionId,
                    itemId: itemId,
                    quantity: quantity,
                });

                // saving item
                await newCartItem.save()
                    .then(()=>{
                        console.log('Item is saved in cart');
                    })
                    .catch(err => {
                        return sendError(res, 'Item cannot be saved in cart', SERVER_ERROR);
                    })
            })
            .catch(err => {
                return sendError(res, 'Cart session cannot be created', SERVER_ERROR);
            })
    }

    return sendSuccess(res, { data: 'Item is added in cart' });
};

// cb: get items from cart

// cb: update items in cart

// cb: delete items from cart