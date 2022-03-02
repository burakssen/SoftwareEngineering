const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {SUCCESS} = require("../common/constants/statusCodes");

const {
    getApprovalRequestService,
    getAllApprovalRequestsService,
    deleteApprovalRequestService,
    createApprovalRequestService,
    getEmployeeWithEmployeeIdService,
    getEmployeeWithManagerIdService,
    updateApprovalRequestService,
    getApprovalRequestWithEmployeeandCourse
} = require("../serviceCallers/approvalRequest");
const {MANAGER, EMPLOYEE} = require("../common/constants/roles");


exports.createApprovalRequestController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER || req.role === EMPLOYEE) {
        req.body.employeeId = req.id;
    }
    const result = await createApprovalRequestService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getApprovalRequestController = asyncHandler(async (req, res) => {
    const result = await getApprovalRequestService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllApprovalRequestsController = asyncHandler(async (req, res) => {
    const result = await getAllApprovalRequestsService();
    res.status(SUCCESS).json({...result});
});

exports.deleteApprovalRequestController = asyncHandler(async (req, res) => {
    const result = await deleteApprovalRequestService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.updateApprovalRequestController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER) {
        req.body.managerId = req.id;
    }
    const result = await updateApprovalRequestService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getApprovalRequestWithManagerIdController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER) {
        req.body.managerId = req.id;
    }
    const result = await getEmployeeWithManagerIdService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getApprovalRequestWithEmployeeIdController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER || req.role === EMPLOYEE) {
        req.body.employeeId = req.id;
    }
    const result = await getEmployeeWithEmployeeIdService(req.body);
    res.status(SUCCESS).json({...result});
});
