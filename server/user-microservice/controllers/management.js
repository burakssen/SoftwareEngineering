const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {SUCCESS, BAD_REQUEST} = require("../common/constants/statusCodes");

const {
    getManagementService,
    createManagementService,
    deleteManagementService,
    getAllManagementService,
    getManagementWithEmployeeService,
    getManagementWithIdService,
    getManagementWithManagerService,
} = require("../services/management");


exports.getManagementController = asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await getManagementService(body.employeeId,body.managerId);
    res.status(SUCCESS).json({management: result});
});

exports.createManagementController = asyncHandler(async (req, res) => {
    const result = await createManagementService(req.body);
    if (result.error) {
        return res.status(BAD_REQUEST).json(result);
    }
    return res.status(SUCCESS).json({management: result});
});

exports.deleteManagementController = asyncHandler(async (req, res) => {
    const result = await deleteManagementService(req.body.managementId);
    return res.status(SUCCESS).json({management: result});
});

exports.getAllManagementController = asyncHandler(async (req, res) => {
    const result = await getAllManagementService();
    return res.status(SUCCESS).json({managements: result});
});

exports.getManagementWithEmployeeController = asyncHandler(async (req, res) => {
    const result = await getManagementWithEmployeeService(req.body.employeeId);
    return res.status(SUCCESS).json({managements: result});
});

exports.getManagementWithManagerController = asyncHandler(async (req, res) => {
    const result = await getManagementWithManagerService(req.body.managerId);
    return res.status(SUCCESS).json({managements: result});
});

exports.getManagementWithIdController = asyncHandler(async (req, res) => {
    const result = await getManagementWithIdService(req.body.managementId);
    res.status(SUCCESS).json({result});
});
