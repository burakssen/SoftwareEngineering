const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/videoCourseMatching");

dotenv.config({path: "./config/config.env"});
//Helper function for body field validation
exports.requestValidator = (method) => {
    switch (method) {
        case endpoints.create: {
            return [
                body("order")
                    .exists()
                    .withMessage("Order is required")
                    .isDecimal()
                    .withMessage("Order should be a decimal number"),
                body("courseId")
                    .exists()
                    .withMessage("courseId is required")
                    .isDecimal()
                    .withMessage("courseId should be a decimal number"),
                body("order")
                    .exists()
                    .withMessage("videoId is required")
                    .isDecimal()
                    .withMessage("videoId should be a decimal number")
            ];
        }
        case endpoints.update: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required"),
                body("order")
                    .if(body("order").exists())
                    .isDecimal()
                    .withMessage("Order should be a decimal number"),
                body("courseId")
                    .if(body("courseId").exists())
                    .isDecimal()
                    .withMessage("courseId should be a decimal number"),
                body("videoId")
                    .if(body("videoId").exists())
                    .isDecimal()
                    .withMessage("videoId should be a decimal number")
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
        case endpoints.getAllVideosByCourseId: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required")
            ];
        }
        case endpoints.getAllCoursesByVideoId: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required")
            ];
        }
    }
};
