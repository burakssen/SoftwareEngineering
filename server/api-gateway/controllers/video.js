const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
} = require("../common/constants/statusCodes");

const {
    createVideoService,
    deleteVideoService,
    updateVideoService,
    getVideoService,
    getAllVideosService
} = require("../serviceCallers/video");


exports.createVideoController = asyncHandler(async (req, res) => {
    const result = await createVideoService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getVideoController = asyncHandler(async (req, res) => {
    const result = await getVideoService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllVideosController = asyncHandler(async (req, res) => {
    const result = await getAllVideosService();
    res.status(SUCCESS).json({...result});
});

exports.deleteVideoController = asyncHandler(async (req, res) => {
    const result = await deleteVideoService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.updateVideoController = asyncHandler(async (req, res) => {
    const result = await updateVideoService(req.body);
    res.status(SUCCESS).json({...result});
});