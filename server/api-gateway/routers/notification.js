const express = require("express");

const {endpoints} = require("../common/constants/endpoints/notification");

const {
    sendNotificationController
} = require("../controllers/notification");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.sendNotification,
    sendNotificationController
);

module.exports = router;
