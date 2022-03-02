const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {management, managementAddress} = require("../common/constants/endpoints/user-microservice");
const axios = require('axios');

dotenv.config();

exports.createManagementService = asyncHandler(async (payload) => {
    const res = await axios.post(managementAddress + management.create, payload);
    return res.data;
});

exports.getManagementService = asyncHandler(async (payload) => {
    const res = await axios.post(managementAddress + management.get, payload);
    return res.data;
});

exports.getAllManagementsService = asyncHandler(async () => {
    const res = await axios.get(managementAddress + management.getAll);
    return res.data;
});

exports.deleteManagementService = asyncHandler(async (payload) => {
    const res = await axios.post(managementAddress + management.delete, payload);
    return res.data;
});

exports.getManagementWithIdService = asyncHandler(async (payload) => {
    const res = await axios.post(managementAddress + management.getWithId, payload);
    return res.data;
});

exports.getManagementWithManagerService = asyncHandler(async (payload) => {
    const res = await axios.post(managementAddress + management.getWithManagerId, payload);
    return res.data;
});

exports.getManagementWithEmployeeService = asyncHandler(async (payload) => {
    const res = await axios.post(managementAddress + management.getWithEmployeeId, payload);
    return res.data;
});
