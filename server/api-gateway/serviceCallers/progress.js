const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {endpoints, reportingMicroServiceAddress} = require("../common/constants/endpoints/progress");
const axios = require('axios');

dotenv.config();

exports.createProgressService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.create, payload);
    return res.data;
});

exports.getProgressService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.get, payload);
    return res.data;
});

exports.getAllProgressService = asyncHandler(async () => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.getAll);
    return res.data;
});

exports.deleteProgressService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.delete, payload);
    return res.data;
});

exports.updateProgressService = asyncHandler(async (payload) => {
    const res = await axios.put(reportingMicroServiceAddress + endpoints.update, payload);
    return res.data;
});

exports.getProgressWithEmployeeIdService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.getProgressWithEmployeeId, payload);
    return res.data;
})

exports.getProgressWithEmployeeIdVideoIdService = asyncHandler(async (payload) => {
    const res = await axios.post(reportingMicroServiceAddress + endpoints.getProgressWithEmployeeIdVideoId, payload);
    return res.data;
})