// importing model
const user = require('../schemas/User');
const { findOneAndUpdate } = require('../schemas/User');
const User = require('../schemas/User');

// importing error handlers
const {
    sendError,
    generateHash,
    setToken,
    sendSuccess,
} = require('../utilities/helpers');

// status codes
const {
    OK,
    BAD_REQUEST,
    FORBIDDEN,
    NOT_AUTHORIZED,
    NOT_FOUND,
} = require('../utilities/statusCodes');

// HASH LENGTH
const {
    USER_HASH_LENGTH
} = require('../configs/index');

// POST: cb for creating user
const createUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        role,
    } = req.body;

    // checking if this user is already in system
    const user = await User.findOne({
        email: email,
    });

    if(user)
        return sendError(res, "User already registered", BAD_REQUEST);

    // creating new user
    let newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        role: role,
    });

    // save new user in database
    newUser = await newUser.save();
    
    // generate token
    const token = await newUser.generateAuthToken();

    // set token entry in database
    setToken(String(newUser._id), token);

    return sendSuccess(res, newUser, token);
}

// GET: cb for get user by id
const getUser = async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId).lean();

    // if user is not found
    if(!user)
        return sendError(res, "User not found", BAD_REQUEST);

    return sendSuccess(res, user);
}

// GET: cb for getting all users
const getAllUsers = async (req, res) => {
    const userList = await User.find({}).lean();

    // if there is no user present
    if(userList.length == 0)
        return sendError(res, "No user found", OK);
    
    return sendSuccess(res, userList);
}

// UPDATE: cb for updating user
const updateUser = async (req, res) => {
    const userId = req.params.id;
    let user = await User.findById(userId).lean();

    // if user is not found
    if(!user)
        return sendError(res, "User not found", BAD_REQUEST);

    user = await User.findByIdAndUpdate(userId, req.body);
    return sendSuccess(res, user);
}

// DELETE: cb for deleting user
const deleteUser = async (req, res) => {
    const userId = req.params.id
    let user = await User.findById(userId).lean();

    // check if user exists
    if(!user)
        return sendError(res, "User not found", BAD_REQUEST);


    // delete the user
    user = await User.findByIdAndRemove(userId);
    return sendSuccess(res, user);
}

module.exports = {
    createUser, 
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
}