const express = require("express");

const { 
  register, 
  get,
  getAll,
  erase,
  update
} = require("../common/constants/endpoints/video");

const {
  registerVideoController,
  getVideoController,
  getAllVideoController,
  eraseVideoController,
  updateVideoController
} = require("../controllers/video");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/video");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
  register,
  requestValidator(register),
  validationHandler,
  registerVideoController
);

router.post(
  get,
  requestValidator(get),
  validationHandler,
  getVideoController
);

router.post(
  getAll,
  getAllVideoController
);

router.post(
  erase,
  requestValidator(erase),
  validationHandler,
  eraseVideoController
);

router.put(
  update,
  requestValidator(update),
  validationHandler,
  updateVideoController
);

module.exports = router;
