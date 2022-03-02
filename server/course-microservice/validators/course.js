const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/course");

dotenv.config({path: "./config/config.env"});
//Helper function for body field validation
exports.requestValidator = (method) => {
    switch (method) {
        case endpoints.create: {
            return [
                body("name")
                    .exists()
                    .withMessage("Name is required")
                    .isLength({min: 2, max: 32})
                    .withMessage("Name should be between 2-32 characters"),
                body("description")
                    .exists()
                    .withMessage("Description is required")
                    .isLength({min: 0, max: 200})
                    .withMessage("Description should not be longer than 200 characters"),
                body("duration")
                    .exists()
                    .withMessage("duration attribute is required"),
                body("isLive")
                    .exists()
                    .withMessage("isLive attribute is required"),
                body("categoryId")
                    .exists()
                    .withMessage("categoryId is required")
            ];
        }
        case endpoints.update: {
            return [
                body("id")
                    .exists()
                    .withMessage("Id is required"),
                body("name")
                    .isLength({min: 2, max: 32})
                    .withMessage("Name should be between 2-32 characters"),
                body("description")
                    .isLength({min: 0, max: 200})
                    .withMessage("Description should not be longer than 200 characters"),
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
        case endpoints.getAllCoursesOfEmployee:{
            return [
                body("employeeId")
                    .exists()
                    .withMessage("employeeId is required")
            ];
        }
    }
};
