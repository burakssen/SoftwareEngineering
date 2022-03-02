const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/management");

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
                body("managerId")
                    .exists()
                    .withMessage("Manager Id is required")
                    .isNumeric(),
            ];
        }
        case endpoints.get: {
            return [
                body("employeeId")
                    .exists()
                    .withMessage("Employee Id is required")
                    .isNumeric(),
                body("managerId")
                    .exists()
                    .withMessage("Manager Id is required")
                    .isNumeric(),
            ];
        }
        case endpoints.delete: {
            return [
                body("managementId")
                    .exists()
                    .withMessage("Management Id is required")
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
        case endpoints.getWithId: {
            return [
                body("managementId")
                    .exists()
                    .withMessage("Management Id is required")
                    .isNumeric(),
            ];
        }
    }
};
