const express = require("express");

const { endpoints } = require("../common/constants/endpoints/notification");

const { 
  sendNotificationController
} = require("../controllers/notification");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/notification");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
  endpoints.sendNotification,
  requestValidator(endpoints.sendNotification),
  validationHandler,
  sendNotificationController
);

module.exports = router;