const { OK } = require("./statusCodes");

// function to send error
module.exports.sendError = (req, message, status ) => {
    res.status(status).json({
        message,
        error: true,
        data: null,
    });
}

// function to send success
module.exports.sendSuccess = (req, data, token) => {
    if(token){
        return res.status(OK).header("x-auth-token", token).json({
            message: "success",
            error: false,
            data,
        });
    }

    res.status(OK).json({
        message: "success",
        error: false,
        data
    });
};