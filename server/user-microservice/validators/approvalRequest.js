const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/approvalRequest");

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
                body("approvalRequestId")
                    .exists()
                    .withMessage("Approval Request Id is required")
                    .isNumeric(),
            ];
        }
        case endpoints.update: {
            return [
                body("approvalRequestId")
                    .exists()
                    .withMessage("Approval Request Id is required")
                    .isNumeric(),
                body("managerId")
                    .exists()
                    .withMessage("Manager Id is required")
                    .isNumeric(),
                body("decision")
                    .exists()
                    .withMessage("Approval Request Id is required")
                    .isInt({min: 1, max: 2}),
            ];
        }
        case endpoints.delete: {
            return [
                body("approvalRequestId")
                    .exists()
                    .withMessage("Approval Request Id is required")
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
        case endpoints.getWithManagerId: {
            return [
                body("managerId")
                    .exists()
                    .withMessage("Manager Id is required")
                    .isNumeric(),
            ];
        }

    }
};
