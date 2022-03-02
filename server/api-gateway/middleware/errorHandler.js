const dotenv = require('dotenv');
const {SUCCESS} = require("../common/constants/statusCodes");
dotenv.config();

//Main error handler function
const errorHandler = (err, req, res, next) => {

    let error = {...err};

    let error_messages = []
    if (error.errors) {
        error.errors.forEach(error => {
            error_messages.push(error.msg);
        });
    }

    if (error.response && error.response.data) {
        if (error.response.data.errors) {
            error.response.data.errors.forEach(error => {
                error_messages.push(error.msg);
            });
        }
    }

    res.status(error.statusCode || 500).json({
        code: process.env.SERVER_ERROR || 500,
        error: error_messages.length ? error_messages : err
    });
    next();
};

module.exports = errorHandler;