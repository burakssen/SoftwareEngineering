const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const axios = require('axios');

dotenv.config();

const url = "http://localhost:8080/api/";

exports.getManagementServiceCaller = asyncHandler(async (payload) => {
    const res = await axios.post(url + "management/get", payload);
    return res.data;
});

exports.getManagementWithEmployeeServiceCaller = asyncHandler(async (payload) => {
    const res = await axios.post(url + "management/get/employeeId", payload);
    return res.data;
});

exports.getManagementWithManagerServiceCaller = asyncHandler(async (payload) => {
    const res = await axios.post(url + "management/get/managerId", payload);
    return res.data;
});

exports.getEnrollmentServiceCaller = asyncHandler(async (payload) => {
    const res = await axios.post(url + "enrollment/get", payload);
    return res.data;
});

exports.createEnrollmentServiceCaller = asyncHandler(async (payload) => {
    const res = await axios.post(url + "enrollment/create", payload);
    return res.data;
});


exports.getManagementWithIdServiceCaller = asyncHandler(async (payload) => {
    const res = await axios.post(url + "management/get/id", payload);
    return res.data;
});

