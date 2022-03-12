// importing model
const user = require('../schemas/User');
const { findOneAndUpdate } = require('../schemas/User');
const User = require('../schemas/User');

// POST: cb for creating user
const createUser = async (req, res) => {
    try{
        const newUser = new User(req.body);

        await newUser.save()
            .then(()=>{
                res.status(201).send('User is created');
            })
            .catch(err => {
                console.log(err);
            })
    }
    catch(error){
        console.log(error);
    }
}

// GET: cb for get user
const getUser = async (req, res) => {
    try{
        const userID = req.params.id;

        const user = await User.findById(userID);
    
        if(user === null)
            console.log('User is found.');
        else
            res.status(200).send(user);
    }
    catch(err){
        console.log(err);
    }
}

// GET: cb for getting all users
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});

        if(users.length === 0)
            console.log('No user found.');
        
        else    
            res.status(200).send(users);
    }
    catch(err){
        console.log(err);
    }
}

// UPDATE: cb for updating user
const updateUser = async (req, res) => {
    try{
        const userID = req.params.id;
        const updatedData = req.body;

        await User.findByIdAndUpdate(userID, updatedData)
            .then(()=>{
                res.status(201).send('User is updated.');
            })
            .catch(err => {
                console.log(err);
            })
    }
    catch(err){
        console.log(err);
    }
}

// DELETE: cb for deleting user
const deleteUser = async (req, res) => {
    try{    
        const userID = req.params.id;

        await User.findByIdAndRemove(userID, (err, data)=>{
            if(err)
                console.log(err);
            
            if(!data)
                console.log('Already Deleted!');
            else   
                res.status(200).send('User is deleted.');
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    createUser, 
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
}