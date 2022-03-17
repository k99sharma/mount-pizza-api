const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    toppings: {
        type: Array,
        required: true,
    },
    style: {
        type: String,
        required: true,
        enum: ["CUSTOM", "DEFAULT"],
        default: "DEFAULT",
    },
    price: {
        type: Number,
        required: true,
    },
    crustType: {
        type: String,
        required: true,
        enum: ["SMALL", "MEDIUM", "LARGE"]
    }
},
{
    timeseries: true,
});

// adding crust price into pizza price
pizzaSchema.pre("save", function(next){
    const crustDict = {
        small: 100,
        medium: 150,
        large: 200,
    };

    if(this.crustType === 'small')
        this.price += crustDict.small;
    else if(this.crustType === 'medium')
        this.price += crustDict.medium;
    else
        this.price += crustDict.large;

    next();
});


const pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = pizza;