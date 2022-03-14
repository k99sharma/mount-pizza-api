// importing schemma
const Order = require('../schemas/Order');
const Pizza = require('../schemas/Pizza');
const Topping = require('../schemas/Topping');

// function to create new order
const createOrder = async (req, res) => {
    const {customerID, pizzasArray} = req.body;
    
    // calculating order price
    let orderPrice = 0;
    for(let i=0; i<pizzasArray.length; i++){
        const pizzaID = pizzasArray[i].pizzaID;
        const toppingsArray = pizzasArray[i].toppingsArray;
        const quantity = pizzasArray[i].quantity;

        // getting pizza price
        const pizza = await Pizza.findById(pizzaID);
        const pizzaPrice = pizza.price;

        // getting topping price
        let toppingPrice = 0;
        for(let j = 0; j < toppingsArray.length; j++){
            const currentToppingID = toppingsArray[j];
            const toppingDetail = Topping.findById(currentToppingID);
            toppingPrice += toppingDetail.price;
        }

        const totalPizzaPrice = (pizzaPrice + toppingPrice) * quantity;

        // adding into order
        orderPrice += totalPizzaPrice;
    }

    // creating the order
    const newOrder = new Order({
        date: Date.now(),
        customerID: customerID,
        pizzas: pizzasArray,
        amount: orderPrice,
    });

    res.send(newOrder);
}

// function to get order using id
const getOrder = async (req, res) => {}

// function to update order
const updateOrder = async (req, res) => {}

// function to delete order
const deleteOrder = async (req, res) => {}


module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
};