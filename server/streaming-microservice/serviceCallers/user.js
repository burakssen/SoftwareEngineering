const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const axios = require('axios');

dotenv.config();

const url = "http://localhost:8080/api/";

exports.getEnrollmentsWithCouseIdsAndEmployeeServiceCaller = asyncHandler(async (payload) => {
    const res = await axios.post(url + "enrollment/get/courseEmployee", payload);
    return res.data;
});

exports.getEmployeeService = asyncHandler(async (payload) => {
    const res = await axios.post(url + "employees/get", payload);
    return res.data;
});