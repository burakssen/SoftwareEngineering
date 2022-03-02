const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const { getVideoDurationInSeconds } = require('get-video-duration')
const crypto = require('crypto')

dotenv.config();

const {SUCCESS} = require("../common/constants/statusCodes");

const { 
    registerVideoService,
    getVideoService,
    getAllVideoService,
    eraseVideoService,
    updateVideoService
} = require("../services/video");

exports.registerVideoController = asyncHandler(async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.videoFile;
    let path = "./videos/" + crypto.randomBytes(10).toString('hex') + ".mp4";
    await file.mv(path, function(err) {
        if (err)
            return res.status(500).send(err);
    });

    req.body.duration  = Math.ceil((await getVideoDurationInSeconds(path)));
    req.body.videoPath = path;

    const result = await registerVideoService(req.body, res);
    return res.status(SUCCESS).json({ NewVideo : result });
});

exports.getVideoController = asyncHandler(async (req, res) => {
    const result = await getVideoService(req.body.id, res);
    res.status(SUCCESS).json({ Video : result });
});

exports.getAllVideoController = asyncHandler(async (req, res) => {
    const result = await getAllVideoService(res);
    res.status(SUCCESS).json({ Videos : result });
});

exports.eraseVideoController = asyncHandler(async (req, res) => {
    const result = await eraseVideoService(req.body.id, res);
    res.status(SUCCESS).json({ DeletedVideo : result });
});

exports.updateVideoController = asyncHandler(async  (req, res) => {
   const result = await updateVideoService(req.body, res);
   res.status(SUCCESS).json({ UpdatedVideo : result });
});