const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {endpoints, notificationMicroServiceAddress} = require("../common/constants/endpoints/notification");
const axios = require('axios');

dotenv.config();

exports.sendNotificationService = asyncHandler(async (payload) => {
    const res = await axios.post(notificationMicroServiceAddress + endpoints.sendNotification, payload);
    return res.data;
});