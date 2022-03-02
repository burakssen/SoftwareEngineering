const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/progress");

dotenv.config({path: "./config/config.env"});
//Helper function for body field validation
exports.requestValidator = (method) => {
    switch (method) {
        case endpoints.create: {
            return [
                body("watchedTime")
                    .exists()
                    .withMessage("watchedTime is required"),
                body("videoId")
                    .exists()
                    .withMessage("videoId is required"),
                body("employeeId")
                    .exists()
                    .withMessage("employeeId attribute is required")
            ];
        }
        case endpoints.update: {
            return [
                body("watchedTime")
                    .exists()
                    .withMessage("watchedTime is required"),
                body("videoId")
                    .exists()
                    .withMessage("videoId is required"),
                body("employeeId")
                    .exists()
                    .withMessage("employeeId attribute is required")
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
        case endpoints.getWithEmployeeId: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required")
            ]
        }
        case endpoints.getWithEmployeeIdVideoId: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required"),
                body("videoId")
                    .exists()
                    .withMessage("Video Id is required")
            ]
        }
    }
};
