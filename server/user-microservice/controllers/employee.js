const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS, SERVER_ERROR, BAD_REQUEST,
} = require("../common/constants/statusCodes");

const {
    createEmployeeService,
    deleteEmployeeService,
    updateEmployeeService,
    getEmployeeService,
    getAllEmployeesService,
    getEmployeeWithUsernameService,
    getEmployeesWithEmployeeRoleService
} = require("../services/employee");


exports.createEmployeeController = asyncHandler(async (req, res) => {
    const result = await createEmployeeService(req.body);
    res.status(SUCCESS).json({employee: result});
});

exports.getEmployeeController = asyncHandler(async (req, res) => {
    const result = await getEmployeeService(req.body.id);
    if(result == null){
        res.status(BAD_REQUEST).json({err : "There is no record with given Id"})
    }
    res.status(SUCCESS).json({employee: result});
});

exports.getAllEmployeesController = asyncHandler(async (req, res) => {
    const result = await getAllEmployeesService();
    res.status(SUCCESS).json({employees: result});
});

exports.getEmployeesWithEmployeeRoleService = asyncHandler(async (req, res) => {
    const result = await getEmployeesWithEmployeeRoleService();
    res.status(SUCCESS).json({employees: result});
});

exports.deleteEmployeeController = asyncHandler(async (req, res) => {
    const result = await deleteEmployeeService(req.body.id);
    res.status(SUCCESS).json({employee: result});
});

exports.updateEmployeeController = asyncHandler(async (req, res) => {
    const result = await updateEmployeeService(req.body);
    if(result[0] == 0){
        res.status(BAD_REQUEST).json({err : "There is no record with given Id"})
    }
    res.status(SUCCESS).json({employee: result});
});

exports.getEmployeeWithUsernameController = asyncHandler(async (req, res) => {
    const result = await getEmployeeWithUsernameService(req.body.username);
    res.status(SUCCESS).json({employee: result});
});
