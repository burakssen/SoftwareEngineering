const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/assignment");

dotenv.config({path: "./config/config.env"});
//Helper function for body field validation
exports.requestValidator = (method) => {
  switch (method) {
    case endpoints.create: {
      return [
        body("deadline")
            .exists()
            .withMessage("Deadline is required")
      ];
    }
    case endpoints.update: {
      return [
        body("id")
            .exists()
            .withMessage("Id is required"),
        body("deadline")
            .exists()
            .withMessage("Deadline is required"),
        body("assignmentDate")
            .exists()
            .withMessage("Assignment Date is required"),
        body("notes")
            .exists()
            .withMessage("Note is required"),
        body("managerId")
            .exists()
            .withMessage("Manager Id is required")
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
            .withMessage("Id is required"),
        body("managerId")
            .exists()
            .withMessage("Manager Id is required")
      ];
    }
    case endpoints.getWithEmployee: {
      return [
        body("employeeId")
            .exists()
            .withMessage("Employee Id is required")
      ];
    }
    case endpoints.getWithManager: {
      return [
        body("managerId")
            .exists()
            .withMessage("Manager Id is required")
      ];
    }
  }
};
