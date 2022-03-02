const { body } = require("express-validator");
const dotenv = require("dotenv");
const { 
  register, 
  get,
  erase,
  update
} = require("../common/constants/endpoints/video");

dotenv.config({ path: "./config/config.env" });

//Helper function for body field validation
exports.requestValidator = (method) => {
  switch (method) {
    case register: {
      return [
        body("title")
          .exists()
          .withMessage("Title is required")
          .isLength({ min: 2, max: 255 })
          .withMessage("Title should be between 2-255 characters!"),
        body("description")
          .exists()
          .withMessage("Description is required")
          .isLength({ min: 0, max: 255 })
          .withMessage("Description can not exceed 255 characters!"),
        body("coverPhoto")
          .exists()
          .withMessage("Cover Photo is required")
      ];
    }
    case get: {
      return [
        body("id")
        .exists()
        .withMessage("Id is required!")
        .isNumeric()
        .withMessage("Id must be numeric!")
      ];
    }
    case erase: {
      return [
        body("id")
        .exists()
        .withMessage("Id is required!")
        .isNumeric()
        .withMessage("Id must be numeric!")
      ]
    }
    case update: {
      return [
        body("id")
          .exists()
          .withMessage("Id is required!")
          .isNumeric()
          .withMessage("Id must be numeric!"),
        body("title")
          .isLength({ min: 2, max: 80 })
          .withMessage("Title should be between 2-80 characters!"),
        body("description")
          .isLength({ min: 0, max: 400 })
          .withMessage("Description can not exceed 400 characters!"),
        body("duration")
          .if(body("duration").exists())
          .isNumeric()
          .withMessage("Duration must be numeric!"),
      ]
    }
  }
};
