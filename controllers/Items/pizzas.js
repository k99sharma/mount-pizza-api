// importing model
const Pizza = require('../../schemas/Pizza');
const Topping = require('../../schemas/Topping');

// base parameters
const BASE_COST = 100;

// function to create pizza
const createPizza = async (req, res) => {
    try{
        const { name, toppings } = req.body;

        // topping sting into array
        const toppingsArray = toppings.split(',');
    
        // calculating price of pizza
        let pizzaPrice = BASE_COST;
        for(let i=0; i<toppingsArray.length; i++){
            const toppingID = toppingsArray[i];
            const topping = await Topping.findById(toppingID);
            pizzaPrice += topping.price;
        }
    
        const newPizza = new Pizza({
            name: name,
            toppings: toppings,
            price: pizzaPrice
        });
    
        await newPizza.save()
            .then(()=>{
                res.status(201).send('Pizza created.');
            })
            .catch(err => {
                console.log(err);
            })
    }
    catch(err){
        console.log(err);
    }
};

// function to update pizza
const updatePizza = async (req, res) => {
    try{
        const pizzaID = req.params.id;
        const { name, toppings } = req.body;

        // topping sting into array
        const toppingsArray = toppings.split(',');
    
        // calculating price of pizza
        let pizzaPrice = BASE_COST;
        for(let i=0; i<toppingsArray.length; i++){
            const toppingID = toppingsArray[i];
            const topping = await Topping.findById(toppingID);
            pizzaPrice += topping.price;
        }
    
        const pizza = new Pizza({
            name: name,
            toppings: toppings,
            price: pizzaPrice
        });
    
        await Pizza.findByIdAndUpdate(pizzaID, pizza)
            .then(()=>{
                res.status(201).send('Pizza is updated.');
            })
            .catch(err => {
                console.log(err);
            })
    }
    catch(err){
        console.log(err);
    }
};

// function to delete pizza
const deletePizza = async (req, res) => {
    try{
        const pizzaID = req.params.id;

        await Pizza.findByIdAndRemove(pizzaID, (err, data)=>{
            if(err)
                console.log(err);

            if(!data)
                console.log('Pizza already deleted.');
            else
                res.status(200).send('Pizza is deleted.');
        })
    }
    catch(err){
        console.log(err);
    }
};

// function to get pizza
const getPizza = async (req, res) => {
    try{
        const pizzaID = req.params.id;

        const pizza = await Pizza.findById(pizzaID);
    
        if(pizza === null)
            console.log('Not found.');
        else
            res.status(200).send(pizza);
    }
    catch(err){
        console.log(err);
    }
};

// function to getAll pizzas
const getAllPizzas = async (req, res) => {
    try{
        const pizzas = await Pizza.find({});

        if(pizzas.length === 0)
            console.log('Pizza not found.');
    
        res.status(200).send(pizzas);
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {
    createPizza,
    updatePizza,
    deletePizza,
    getPizza,
    getAllPizzas,
};