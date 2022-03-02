const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
    SERVER_ERROR
} = require("../common/constants/statusCodes");

const { 
    registerAssignmentService, 
    deleteAssignmentService, 
    getAssignmentService, 
    getAllAssignmentsService,
    updateAssignmentService,
    getAssignmentsWithEmployeeIdService,
    getAssignmentsWithManagerIdService
} = require("../services/assignment");

// @desc      Create a new assignment
// @route     POST /api/course/createAssignment
// @access    Public
exports.registerAssignmentController = asyncHandler(async (req, res) => {
    const result = await registerAssignmentService(req.body, res);
    if(result.error){
        res.status(SUCCESS).json(result);
    }
    res.status(SUCCESS).json({ newAssignment : result});
});


// @desc      Delete existing assignment with given id
// @route     POST /api/course/deleteAssignment
// @access    Public
exports.deleteAssignmentController = asyncHandler(async (req, res) => {
    const result = await deleteAssignmentService(req.body.id, req.body.managerId, res);
    if(result === 0){
        res.status(SERVER_ERROR).json({ err: "There is no record with given Id"});
    } else if(result.error){
        res.status(SUCCESS).json(result);
    } else{
        res.status(SUCCESS).json({ deletedAssignment: result});
    }
});


// @desc      Get existing assignment with given id
// @route     GET /api/course/getAssignment
// @access    Public
exports.getAssignmentController = asyncHandler(async (req, res) => {
    const result = await getAssignmentService(req.body.id, res);
    if(result == null){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ assignment : result});
    }
});


// @desc      Get all existing categories
// @route     GET /api/course/getAllCategories
// @access    Public
exports.getAllAssignmentsController = asyncHandler(async (req, res) => {
    const result = await getAllAssignmentsService(res);
    res.status(SUCCESS).json({ allAssignments : result});
});


// @desc      Update existing assignment with given id
// @route     GET /api/course/updateAssignment
// @access    Public
exports.updateAssignmentController = asyncHandler(async (req, res) => {
    const result = await updateAssignmentService(req.body, res);
    if(result == null) {
        res.status(SERVER_ERROR).json({err: "There is no record with given Id"})
    } else if(result.error){
        res.status(SERVER_ERROR).json(result);
    } else{
        res.status(SUCCESS).json({ updatedAssignment : result});
    }
});

exports.getAssignmentsWithEmployeeIdController = asyncHandler(async (req, res) => {
    const result = await getAssignmentsWithEmployeeIdService(req.body.employeeId, res);
    res.status(SUCCESS).json({ assignments : result});
});

exports.getAssignmentsWithManagerIdController = asyncHandler(async (req, res) => {
    const result = await getAssignmentsWithManagerIdService(req.body.managerId, res);
    res.status(SUCCESS).json({ assignments : result});
});