const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {enrollment, enrollmentAddress} = require("../common/constants/endpoints/user-microservice");
const axios = require('axios');

dotenv.config();

exports.createEnrollmentService = asyncHandler(async (payload) => {
    const res = await axios.post(enrollmentAddress + enrollment.create, payload);
    return res.data;
});

exports.getEnrollmentService = asyncHandler(async (payload) => {
    const res = await axios.post(enrollmentAddress + enrollment.get, payload);
    return res.data;
});

exports.getAllEnrollmentsService = asyncHandler(async () => {
    const res = await axios.get(enrollmentAddress + enrollment.getAll);
    return res.data;
});

exports.deleteEnrollmentService = asyncHandler(async (payload) => {
    const res = await axios.post(enrollmentAddress + enrollment.delete, payload);
    return res.data;
});

exports.getEnrollmentWithIdService = asyncHandler(async (payload) => {
    const res = await axios.post(enrollmentAddress + enrollment.getWithId, payload);
    return res.data;
});

exports.getEnrollmentWithCourseIdService = asyncHandler(async (payload) => {
    const res = await axios.post(enrollmentAddress + enrollment.getWithCourseId, payload);
    return res.data;
});

exports.getEnrollmentWithEmployeeIdService = asyncHandler(async (payload) => {
    const res = await axios.post(enrollmentAddress + enrollment.getWithEmployeeId, payload);
    return res.data;
});
