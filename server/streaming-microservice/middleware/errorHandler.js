const dotenv = require('dotenv');
dotenv.config();

/**
 * @todo Other error codes should be handled.
 */
//Main error handler function
const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    res.status(error.statusCode || 500).json({
        code: process.env.SERVER_ERROR || 500,
        error: error.message || 'Server Error'
    });
    next();
};

module.exports = errorHandler;