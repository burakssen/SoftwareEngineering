const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {endpoints, reportingMicroServiceAddress} = require("../common/constants/endpoints/assignment");
const axios = require('axios');

dotenv.config();

exports.createAssignmentService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.create, payload);
    return res.data;
});

exports.getAssignmentService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.get, payload);
    return res.data;
});

exports.getAllAssignmentsService = asyncHandler(async () => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.getAll);
    return res.data;
});

exports.deleteAssignmentService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.delete, payload);
    return res.data;
});

exports.updateAssignmentService = asyncHandler(async (payload) => {
    const res = await axios.put(reportingMicroServiceAddress + endpoints.update, payload);
    return res.data;
});

exports.getAssignmentWithManagerService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.getWithManager, payload);
    return res.data;
});

exports.getAssignmentWithEmployeeService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.getWithEmployee, payload);
    return res.data;
});