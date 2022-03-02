const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
    SERVER_ERROR
} = require("../common/constants/statusCodes");

const {
    registerVideoCourseMatchingService,
    deleteVideoCourseMatchingService,
    getVideoCourseMatchingService,
    getAllVideoCourseMatchingsService,
    updateVideoCourseMatchingService,
    getAllVideosByCourseIdService,
    getAllCoursesByVideoIdService
} = require("../services/VideoCourseMatching");


// @desc      Create a new VideoCourseMatching
// @route     POST /api/videoCourseMatching/createVideoCourseMatching
// @access    Public
exports.registerVideoCourseMatchingController = asyncHandler(async (req, res) => {
    const result = await registerVideoCourseMatchingService(req.body, res);
    res.status(SUCCESS).json({ newVideoCourseMatching : result});
});


// @desc      Delete existing VideoCourseMatching with given id
// @route     POST /api/videoCourseMatching/deleteVideoCourseMatching
// @access    Public
exports.deleteVideoCourseMatchingController = asyncHandler(async (req, res) => {
    const result = await deleteVideoCourseMatchingService(req.body.id, res);
    if(result == 0){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ deletedVideoCourseMatching: result});
    }
});


// @desc      Get existing VideoCourseMatching with given id
// @route     GET /api/videoCourseMatching/getVideoCourseMatching
// @access    Public
exports.getVideoCourseMatchingController = asyncHandler(async (req, res) => {
    const result = await getVideoCourseMatchingService(req.body.id, res);
    if(result == null){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ videoCourseMatching : result});
    }
});


// @desc      Get all existing categories
// @route     GET /api/videoCourseMatching/getAllCategories
// @access    Public
exports.getAllVideoCourseMatchingsController = asyncHandler(async (req, res) => {
    const result = await getAllVideoCourseMatchingsService(res);
    res.status(SUCCESS).json({ allVideoCourseMatchings : result});
});


// @desc      Update existing VideoCourseMatching with given id
// @route     GET /api/videoCourseMatching/updateVideoCourseMatching
// @access    Public
exports.updateVideoCourseMatchingController = asyncHandler(async (req, res) => {
    const result = await updateVideoCourseMatchingService(req.body, res);
    if(result == null){
        res.status(SERVER_ERROR).json({ err : "There is no record with given Id"});
    }else{
        res.status(SUCCESS).json({ updatedVideoCourseMatching : result});
    }
});

// @desc      Get all videos of desired course with given courseId
// @route     GET /api/videoCourseMatching/getAllVideosByCourseId
// @access    Public
exports.getAllVideosByCourseIdController = asyncHandler(async (req, res) => {
    const result = await getAllVideosByCourseIdService(req.body.id, res);
    if(result.allVideos.length === 0){
        res.status(SERVER_ERROR).json({ err : "There is no record with given Id"});
    }else{
        res.status(SUCCESS).json(result);
    }
});

exports.getAllCoursesByVideoIdController = asyncHandler(async (req, res) => {
    const result = await getAllCoursesByVideoIdService(req.body.id, res);
    if(result.length === 0){
        res.status(SERVER_ERROR).json({ err : "There is no record with given Id"});
    }else{
        res.status(SUCCESS).json(result);
    }
});