const { sendError } = require("../utilities/helpers");
const { NOT_FOUND, SERVER_ERROR } = require("../utilities/helpers");


// function to catch errors
// it takes another function as a parameter
module.exports.catchErrors = middlewareFunction => {
    return async (req, res, next) => {
        try{
            await middlewareFunction(req, res, next);
        }
        catch(err){
            next(err);
        }
    };
};

// not found routes
module.exports.notFound = (req, res) => {
    sendError(res, "Route doesn't exist", NOT_FOUND);
};


// custom made error handler
module.exports.sendErrors = (err, req, res, next) => {
    // loggin on console backend
    console.log(err);

    // sending to user on frontend
    sendError(req, "Something went wrong", err.status || SERVER_ERROR);
}