const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
} = require("../common/constants/statusCodes");

const {
    createAssignmentService,
    deleteAssignmentService,
    updateAssignmentService,
    getAssignmentService,
    getAllAssignmentsService,
    getAssignmentWithEmployeeService,
    getAssignmentWithManagerService
} = require("../serviceCallers/assignment");
const {EMPLOYEE, MANAGER} = require("../common/constants/roles");


exports.createAssignmentController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER) {
        req.body.managerId = req.id;
    }
    const result = await createAssignmentService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAssignmentController = asyncHandler(async (req, res) => {
    const result = await getAssignmentService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllAssignmentsController = asyncHandler(async (req, res) => {
    const result = await getAllAssignmentsService();
    res.status(SUCCESS).json({...result});
});

exports.deleteAssignmentController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER) {
        req.body.managerId = req.id;
    }
    const result = await deleteAssignmentService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.updateAssignmentController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER) {
        req.body.managerId = req.id;
    }
    const result = await updateAssignmentService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAssignmentWithEmployeeController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER || req.role === EMPLOYEE) {
        req.body.employeeId = req.id;
    }
    const result = await getAssignmentWithEmployeeService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAssignmentWithManagerController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER) {
        req.body.managerId = req.id;
    }
    const result = await getAssignmentWithManagerService(req.body);
    res.status(SUCCESS).json({...result});
});