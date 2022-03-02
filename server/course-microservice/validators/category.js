const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/category");

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
            .withMessage("Name should be between 2-32 characters")
      ];
    }
    case endpoints.update: {
      return [
        body("id")
            .exists()
            .withMessage("Id is required"),
        body("name")
            .isLength({min: 2, max: 32})
            .withMessage("Name should be between 2-32 characters")
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
