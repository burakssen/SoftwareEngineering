const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {employee, employeeAddress} = require("../common/constants/endpoints/user-microservice");
const axios = require('axios');

dotenv.config();

exports.createEmployeeService = asyncHandler(async (payload) => {
    const res = await axios.post(employeeAddress + employee.create, payload);
    return res.data;
});

exports.getEmployeeService = asyncHandler(async (payload) => {
    const res = await axios.post(employeeAddress + employee.get, payload);
    return res.data;
});

exports.getAllEmployeesService = asyncHandler(async () => {
    const res = await axios.post(employeeAddress + employee.getAll);
    return res.data;
});

exports.getAllEmployeeRoleService = asyncHandler(async () => {
    const res = await axios.post(employeeAddress + employee.getAllEmployeeRole);
    return res.data;
});

exports.deleteEmployeeService = asyncHandler(async (payload) => {
    const res = await axios.post(employeeAddress + employee.delete, payload);
    return res.data;
});

exports.updateEmployeeService = asyncHandler(async (payload) => {
    const res = await axios.put(employeeAddress + employee.update, payload);
    return res.data;
});

exports.getEmployeeWithUsernameService = asyncHandler(async (payload) => {
    const res = await axios.post(employeeAddress + employee.getWithUsername, payload);
    return res.data;
});