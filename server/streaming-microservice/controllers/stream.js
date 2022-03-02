const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();
const {streamVideoService} = require("../services/stream");
const {BAD_REQUEST} = require("../common/constants/statusCodes");

exports.streamVideoController = asyncHandler(async (req, res) => {
    const videoStream = await streamVideoService(req, res);
    if(videoStream){
        videoStream.pipe(res);
    }else{
        res.status(BAD_REQUEST);
    }
});
