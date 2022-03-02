const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {SUCCESS, BAD_REQUEST} = require("../common/constants/statusCodes");

const {
    createApprovalRequestService,
    updateApprovalRequestService,
    deleteApprovalRequestService,
    getAllApprovalRequestsService,
    getApprovalRequestService,
    getApprovalRequestsWithEmployeeService,
    getApprovalRequestsWithManagerService
} = require("../services/approvalRequest");


exports.getApprovalRequestController = asyncHandler(async (req, res) => {
    const result = await getApprovalRequestService(req.body.approvalRequestId);
    res.status(SUCCESS).json({approvalRequest: result});
});

exports.createApprovalRequestController = asyncHandler(async (req, res) => {
    const result = await createApprovalRequestService(req.body);
    if (result.error) {
        return res.status(BAD_REQUEST).json(result);
    }
    return res.status(SUCCESS).json({approvalRequest: result});
});

exports.deleteApprovalRequestController = asyncHandler(async (req, res) => {
    const result = await deleteApprovalRequestService(req.body.approvalRequestId);
    return res.status(SUCCESS).json({approvalRequest: result});
});

exports.updateApprovalRequestController = asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await updateApprovalRequestService(body.approvalRequestId, body.managerId, body.decision);
    return res.status(SUCCESS).json({approvalRequest: result});
});

exports.getAllApprovalRequestsController = asyncHandler(async (req, res) => {
    const result = await getAllApprovalRequestsService();
    return res.status(SUCCESS).json({approvalRequests: result});
});

exports.getApprovalRequestsWithEmployeeController = asyncHandler(async (req, res) => {
    const result = await getApprovalRequestsWithEmployeeService(req.body.employeeId);
    return res.status(SUCCESS).json({approvalRequests: result});
});

exports.getApprovalRequestsWithManagerController = asyncHandler(async (req, res) => {
    const result = await getApprovalRequestsWithManagerService(req.body.managerId);
    res.status(SUCCESS).json({approvalRequests: result});
});
