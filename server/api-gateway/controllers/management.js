const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
} = require("../common/constants/statusCodes");

const {
    getManagementWithManagerService,
    getManagementWithIdService,
    deleteManagementService,
    getManagementWithEmployeeService,
    createManagementService,
    getManagementService,
    getAllManagementsService,
} = require("../serviceCallers/management");
const {MANAGER, EMPLOYEE} = require("../common/constants/roles");

exports.createManagementController = asyncHandler(async (req, res) => {
    const result = await createManagementService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getManagementController = asyncHandler(async (req, res) => {
    const result = await getManagementService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllManagementsController = asyncHandler(async (req, res) => {
    const result = await getAllManagementsService();
    res.status(SUCCESS).json({...result});
});

exports.deleteManagementController = asyncHandler(async (req, res) => {
    const result = await deleteManagementService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getManagementWithEmployeeController = asyncHandler(async (req, res) => {
    if (req.role === EMPLOYEE || req.role === MANAGER) {
        req.body.employeeId = req.id;
    }
    const result = await getManagementWithEmployeeService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getManagementWithIdController = asyncHandler(async (req, res) => {
    const result = await getManagementWithIdService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getManagementWithManagerController = asyncHandler(async (req, res) => {
    if (req.role === MANAGER) {
        req.body.managerId = req.id;
    }
    const result = await getManagementWithManagerService(req.body);
    res.status(SUCCESS).json({...result});
});