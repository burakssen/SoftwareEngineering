const express = require("express");

const { endpoints } = require("../common/constants/endpoints/category");

const { 
  registerCategoryController, 
  deleteCategoryController, 
  getCategoryController, 
  getAllCategoriesController, 
  updateCategoryController
} = require("../controllers/category");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/category");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
  endpoints.create,
  requestValidator(endpoints.create),
  validationHandler,
  registerCategoryController
);

router.post(
  endpoints.delete,
  requestValidator(endpoints.delete),
  validationHandler,
  deleteCategoryController,
);

router.post(
  endpoints.get,
  requestValidator(endpoints.get),
  validationHandler,
  getCategoryController
);

router.get(
  endpoints.getAll,
  getAllCategoriesController
);

router.put(
  endpoints.update,
  requestValidator(endpoints.update),
  validationHandler,
  updateCategoryController
);

module.exports = router;