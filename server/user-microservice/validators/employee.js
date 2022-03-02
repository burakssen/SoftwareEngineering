const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/employee");

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
        body("surname")
            .exists()
            .withMessage("Surname is required")
            .isLength({min: 2, max: 32})
            .withMessage("Surname should be between 2-32 characters"),
        body("username")
            .exists()
            .withMessage("Username is required")
            .isLength({min: 2, max: 32})
            .withMessage("Username should be between 2-32 characters"),
        body("password")
            .exists()
            .withMessage("Password is required")
            .isLength({min: 8, max: 32})
            .withMessage("Password should be between 8-32 characters"),
        body("email")
            .exists()
            .isEmail()
            .withMessage("Proper email is required")
            .isLength({min: 2, max: 32})
            .withMessage("Email should be between 2-32 characters"),
        body("positionName")
            .exists()
            .withMessage("Position name is required")
            .isLength({min: 2, max: 32})
            .withMessage("Position name  should be between 2-32 characters"),
        body("isManager")
            .isBoolean()
      ];
    }
    case endpoints.update: {
      return [
        body("id")
            .exists()
            .withMessage("Id is required"),
        body("name")
            .if(body("name").exists())
            .isLength({min: 2, max: 32})
            .withMessage("Name should be between 2-32 characters"),
        body("surname")
            .if(body("surname").exists())
            .isLength({min: 2, max: 32})
            .withMessage("Surname should be between 2-32 characters"),
        body("username")
            .if(body("username").exists())
            .isLength({min: 2, max: 32})
            .withMessage("Username should be between 2-32 characters"),
        body("password")
            .if(body("password").exists())
            .isLength({min: 8, max: 32})
            .withMessage("Password should be between 8-32 characters"),
        body("email")
            .if(body("email").exists())
            .isEmail()
            .withMessage("Proper email is required")
            .isLength({min: 2, max: 32})
            .withMessage("Email should be between 2-32 characters"),
        body("positionName")
            .if(body("positionName").exists())
            .isLength({min: 2, max: 32})
            .withMessage("Position name  should be between 2-32 characters"),
        body("isManager")
            .if(body("isManager").exists())
            .isBoolean()
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
      case endpoints.getWithUsername: {
          return [
              body("username")
                  .exists()
                  .withMessage("Username is required")
          ];
      }
  }
};
