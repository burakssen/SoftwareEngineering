const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const crypto = require("crypto");
const {SECRET_KEY} = require("../common/secretKeys");

const {
    createEmployeeDataAccess,
    deleteEmployeeDataAccess,
    updateEmployeeDataAccess,
    getAllEmployeesDataAccess,
    getEmployeeDataAccess,
    getEmployeeWithUsernameDataAccess,
    getEmployeesWithEmployeeRoleDataAccess
} = require("../dataAccess/employee");

exports.createEmployeeService = asyncHandler(async (employee) => {
    const password = employee.password;
    employee.password = crypto.createHash("sha256", SECRET_KEY).update(password, "binary").digest("base64");
    return await createEmployeeDataAccess(employee);
});

exports.getEmployeeService = asyncHandler(async (employeeId) => {
    return await getEmployeeDataAccess(employeeId);
});

exports.getAllEmployeesService = asyncHandler(async () => {
    return await getAllEmployeesDataAccess();
});

exports.getEmployeesWithEmployeeRoleService = asyncHandler(async () => {
    return await getEmployeesWithEmployeeRoleDataAccess();
});

exports.deleteEmployeeService = asyncHandler(async (employeeId) => {
    return await deleteEmployeeDataAccess(employeeId);
});

exports.updateEmployeeService = asyncHandler(async (employee) => {
    return await updateEmployeeDataAccess(employee);
});

exports.getEmployeeWithUsernameService = asyncHandler(async (username) => {
    return await getEmployeeWithUsernameDataAccess(username);
});

exports.isManagerService = asyncHandler(async (employeeId) => {
    const employee = await getEmployeeDataAccess(employeeId);
    return employee.isManager;
});