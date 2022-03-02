const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
    SERVER_ERROR
} = require("../common/constants/statusCodes");

const {
    registerProgressService,
    deleteProgressService,
    getProgressService,
    getAllProgressService,
    updateProgressService,
    getWithEmployeeIdService,
    getWithEmployeeIdAndVideoService
} = require("../services/progress");


// @desc      Create a new Progress
// @route     POST /api/reporting/createProgress
// @access    Public
exports.registerProgressController = asyncHandler(async (req, res) => {
    const result = await registerProgressService(req.body, res);
    return res.status(SUCCESS).json({ newProgress : result});
});


// @desc      Delete existing Progress with given id
// @route     POST /api/reporting/deleteProgress
// @access    Public
exports.deleteProgressController = asyncHandler(async (req, res) => {
    const result = await deleteProgressService(req.body.id, res);
    if(result === 0){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ deletedProgress: result});
    }
});


// @desc      Get existing Progress with given id
// @route     GET /api/reporting/getProgress
// @access    Public
exports.getProgressController = asyncHandler(async (req, res) => {
    const result = await getProgressService(req.body.id, res);
    if(result == null){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ progress : result});
    }
});


// @desc      Get all existing progresses
// @route     GET /api/reporting/getAllProgress
// @access    Public
exports.getAllProgressController = asyncHandler(async (req, res) => {
    const result = await getAllProgressService(res);
    res.status(SUCCESS).json({ allProgress : result});
});


// @desc      Update existing Progress with given id
// @route     GET /api/reporting/updateProgress
// @access    Public
exports.updateProgressController = asyncHandler(async (req, res) => {
    const result = await updateProgressService(req.body, res);
    if(result == null){
        res.status(202).json({ err : "Update does not handled."});
    }else{
        res.status(SUCCESS).json({ updatedProgress : result});
    }
});

exports.getWithEmployeeIdController = asyncHandler( async (req, res) => {
    const result = await getWithEmployeeIdService(req.body.id);
    if(result === []){
        res.status(SERVER_ERROR).json({ err : "There is no record with given employee Id"});
    }else{
        res.status(SUCCESS).json({ updatedProgress : result});
    }
})

exports.getWithEmployeeIdAndVideoController = asyncHandler( async (req, res) => {
    const result = await getWithEmployeeIdAndVideoService(req.body.id, req.body.videoId);
    if(result == null){
        res.status(SERVER_ERROR).json({ err : "There is no record with given employee Id"});
    }else{
        res.status(SUCCESS).json({ updatedProgress : result});
    }
})