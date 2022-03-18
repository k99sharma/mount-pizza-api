// importing schemas
const User = require('../schemas/User');
const Token = require('../schemas/Token');
const { sendError, sendSuccess } = require('../utilities/helpers');
const {
    BAD_REQUEST
    , NOT_FOUND,
    FORBIDDEN
} = require('../utilities/statusCodes');

// cb: to login user
module.exports.login = async (req, res, next) => {
    const {
        email,
        password,
    } = req.body;

    const user = await User.findOne({ email: email });

    // check if user exists
    if (user) {
        // check is password is correct
        const validPassword = await user.isValidPwd(password, user.password);
        if (!validPassword) {
            return sendError(res, 'Wrong email or password', BAD_REQUEST);
        } else {
            // updating the last login time and date
            await User.findByIdAndUpdate(user._id, {
                lastLoginAt: new Date(Date.now()).toISOString(),
            })

            // check if there is token available already
            const token = Token.findOne({ userId: user._id });

            // if token is found 
            if (token) {
                return sendError(res, 'Already loggedIn. Please logout.', FORBIDDEN);
            } else {
                // generate new token if expired
                const newToken = await user.generateAuthToken();
                return sendSuccess(res, user, newToken);
            }
        }

    } else {
        return sendError(res, 'User not found', NOT_FOUND);
    }
}
