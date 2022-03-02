const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/enrollment");

dotenv.config({path: "./config/config.env"});

//Helper function for body field validation
exports.requestValidator = (method) => {
    switch (method) {
        case endpoints.create: {
            return [
                body("employeeId")
                    .exists()
                    .withMessage("Employee Id is required")
                    .isNumeric(),
                body("courseId")
                    .exists()
                    .withMessage("Course Id is required")
                    .isNumeric(),
            ];
        }
        case endpoints.get: {
            return [
                body("employeeId")
                    .exists()
                    .withMessage("Employee Id is required")
                    .isNumeric(),
                body("courseId")
                    .exists()
                    .withMessage("Course Id is required")
                    .isNumeric(),
            ];
        }
        case endpoints.delete: {
            return [
                body("enrollmentId")
                    .exists()
                    .withMessage("Enrollment Id is required")
                    .isNumeric(),
            ];
        }
        case endpoints.getWithEmployeeId: {
            return [
                body("employeeId")
                    .exists()
                    .withMessage("Employee Id is required")
                    .isNumeric(),
            ];
        }
        case endpoints.getWithCourseId: {
            return [
                body("courseId")
                    .exists()
                    .withMessage("Course Id is required")
                    .isNumeric(),
            ];
        }
        case endpoints.getWithId: {
            return [
                body("enrollmentId")
                    .exists()
                    .withMessage("Enrollment Id is required")
                    .isNumeric(),
            ];
        }
    }
};
