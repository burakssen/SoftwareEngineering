const dotenv = require('dotenv');
dotenv.config();

/**
 * @todo Other error codes should be handled.
 */
//Main error handler function
const errorHandler = (err, req, res, next) => {
    let error = {...err};
    let error_messages = []
    if (error.errors) {
        error.errors.forEach(error => {
            error_messages.push(error.message)
        });
    }

    res.status(error.statusCode || 500).json({
        code: process.env.SERVER_ERROR || 500,
        error: error_messages.length ? error_messages : ['Server Error']
    });
    next();
};

module.exports = errorHandler;