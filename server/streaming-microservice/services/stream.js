const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const {PARTIAL_CONTENT} = require("../common/constants/statusCodes");
const fs = require("fs");
const {getVideoDataAccess} = require("../dataAccess/video");
const {getAllCoursesByVideoIdServiceCaller} = require("../serviceCallers/course");
const {getEnrollmentsWithCouseIdsAndEmployeeServiceCaller} = require("../serviceCallers/user");
const {JWT_SECRET_KEY} = require("../common/constants/secretKeys");
const {verify, decode} = require("jsonwebtoken");
const {ADMIN_ID} = require("../common/constants/roles");

exports.streamVideoService = asyncHandler(async (req, res) => {
    if(req.params.token == null){
        return null;
    }
    const token = req.params.token;
    if (!verify(token, JWT_SECRET_KEY)) {
        return null;
    }
    const {videoId, employeeId} = decode(token, JWT_SECRET_KEY);

    if(req.id != employeeId){
        return null;
    }

    if(employeeId != ADMIN_ID){
        const response = await getAllCoursesByVideoIdServiceCaller({id: videoId});
        let courseIds = [];
        response.forEach(course => {
            courseIds.push(course.course.id);
        });

        const {result} = await getEnrollmentsWithCouseIdsAndEmployeeServiceCaller({courseIds, employeeId});
        if(result.length === 0){
            return null;
        }
    }

    if (req.headers.range == null)
        req.headers.range = "bytes=0-"
    const range = req.headers.range;

    const video = await getVideoDataAccess(videoId);
    const videoPath = video.videoPath;
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(PARTIAL_CONTENT, headers);
    return fs.createReadStream(videoPath, {start, end});
});