const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/notification");

dotenv.config({path: "./config/config.env"});
//Helper function for body field validation
exports.requestValidator = (method) => {
  switch (method) {
    case endpoints.sendNotification: {
      return [
        body("receiver")
            .exists()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email must be in correct format"),
        body("subject")
            .exists()
            .withMessage("You must enter a subject"),
        body("message")
            .exists()
            .withMessage("You must enter a message")
      ];
    }
  }
};
