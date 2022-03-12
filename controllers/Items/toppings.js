// importing model
const Topping = require('../../schemas/Topping');

// function to create new topping
const createTopping = async (req, res) => {
    try{
        const newTopping = new Topping(req.body);

        await newTopping.save()
            .then(()=>{
                res.status(201).send('Topping is created.');
            })
            .catch(err => {
                console.log(err);
            })
    }
    catch(err){
        console.log(err);
    }
}

// function to get topping by id
const getTopping = async (req, res) => {
    try{
        const ToppingID = req.params.id;

        const topping = await Topping.findById(ToppingID);
    
        if(!topping)
            console.log('Topping not found.');
        else
            res.status(200).send(topping);
    }
    catch(err){
        console.log(err);
    }
}

// function to get all toppings
const getAllToppings = async (req, res) => {
    try{
        const toppings = await Topping.find({});

        if(toppings.length === 0)
            console.log('Topping not found.');
    
        res.status(200).send(toppings);
    }
    catch(err){
        console.log(err);
    }
}

// function to update topping
const updateTopping = async (req, res) => {
    try{
        const toppingID = req.params.id;
        const updatedData = req.body;
    
        await Topping.findByIdAndUpdate(toppingID, updatedData)
            .then(()=>{
                res.status(201).send('Topping is updated.');
            })
            .catch(err => {
                console.log('Topping is not updated.')
            })
    }
    catch(err){
        console.log(err);
    }
}

// function to delete topping
const deleteTopping = async (req, res) => {
    try{
        const toppingID = req.params.id;
        
        await Topping.findByIdAndRemove(toppingID, (err, data)=>{
            if(err)
                console.log(err);
            
            if(!data)
                console.log('Already deleted.');
            else
                res.status(200).send('Topping deleted.');
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    createTopping,
    getTopping, 
    getAllToppings,
    updateTopping,
    deleteTopping,
};