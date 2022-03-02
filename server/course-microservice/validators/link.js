const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/link");

dotenv.config({path: "./config/config.env"});
//Helper function for body field validation
exports.requestValidator = (method) => {
    switch (method) {
        case endpoints.create: {
            return [
                body("platform")
                    .exists()
                    .withMessage("Platform is required")
                    .isLength({min: 2, max: 32})
                    .withMessage("Platform should be between 2-32 characters"),
                body("meetingLink")
                    .exists()
                    .withMessage("Meeting link is required"),
                body("meetingTime")
                    .exists()
                    .withMessage("Meeting time is required"),
                body("capacity")
                    .exists()
                    .withMessage("Capacity is required")
                    .isDecimal()
                    .withMessage("Capacity should be a decimal number"),
                body("courseId")
                    .exists()
                    .withMessage("courseId is required")
                    .isDecimal()
                    .withMessage("courseId should be a decimal number")
            ];
        }
        case endpoints.update: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required"),
                body("platform")
                    .if(body("platform").exists())
                    .isLength({min: 2, max: 32})
                    .withMessage("Platform should be between 2-32 characters"),
                body("meetingTime")
                    .if(body("meetingTime").exists())
                    .isDate()
                    .withMessage("Meeting time should be in date format"),
                body("capacity")
                    .if(body("capacity").exists())
                    .isDecimal()
                    .withMessage("Capacity should be a decimal number"),
                body("courseId")
                    .if(body("courseId").exists())
                    .isDecimal()
                    .withMessage("courseId should be a decimal number")
            ];
        }
        case endpoints.get: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required")
            ];
        }
        case endpoints.delete: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required")
            ];
        }
    }
};
