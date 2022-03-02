const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
} = require("../common/constants/statusCodes");

const {
    createEmployeeService,
    deleteEmployeeService,
    updateEmployeeService,
    getEmployeeService,
    getAllEmployeesService,
    getEmployeeWithUsernameService,
    getAllEmployeeRoleService
} = require("../serviceCallers/employee");


exports.createEmployeeController = asyncHandler(async (req, res) => {
    const result = await createEmployeeService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getEmployeeController = asyncHandler(async (req, res) => {
    const result = await getEmployeeService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllEmployeesController = asyncHandler(async (req, res) => {
    const result = await getAllEmployeesService();
    res.status(SUCCESS).json({...result});
});

exports.getAllEmployeeRoleController = asyncHandler(async (req, res) => {
    const result = await getAllEmployeeRoleService();
    res.status(SUCCESS).json({...result});
});

exports.deleteEmployeeController = asyncHandler(async (req, res) => {
    const result = await deleteEmployeeService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.updateEmployeeController = asyncHandler(async (req, res) => {
    const result = await updateEmployeeService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getEmployeeWithUsernameController = asyncHandler(async (req, res) => {
    const result = await getEmployeeWithUsernameService(req.body);
    res.status(SUCCESS).json({...result});
});
