const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {PARTIAL_CONTENT} = require("../common/constants/statusCodes");

const {streamVideoService} = require("../serviceCallers/stream");

exports.streamVideoController = asyncHandler(async (req, res) => {
    const result = await streamVideoService(req);
    const headers = {
        "Content-Range": result.headers['content-range'],
        "Accept-Ranges": "bytes",
        "Content-Length": result.headers['content-length'],
        "Content-Type": "video/mp4",
    };
    await res.writeHead(PARTIAL_CONTENT, headers)
    await res.write(result.data);
});
