const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS
} = require("../common/constants/statusCodes");

const {
    sendNotificationService
} = require("../services/notification");


// @desc      Send a new notification
// @route     POST /api/notification/sendNotification
// @access    Public
exports.sendNotificationController = asyncHandler(async (req, res) => {
    await sendNotificationService(req, res);
});
