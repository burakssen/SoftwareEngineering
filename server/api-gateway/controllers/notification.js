const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
} = require("../common/constants/statusCodes");

const {
    sendNotificationService
} = require("../serviceCallers/notification");


exports.sendNotificationController = asyncHandler(async (req, res) => {
    const result = await sendNotificationService(req.body);
    res.status(SUCCESS).json({...result});
});