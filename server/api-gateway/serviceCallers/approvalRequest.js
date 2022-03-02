const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {approvalRequest, approvalRequestAddress} = require("../common/constants/endpoints/user-microservice");
const axios = require('axios');

dotenv.config();

exports.createApprovalRequestService = asyncHandler(async (payload) => {
    const res = await axios.post(approvalRequestAddress + approvalRequest.create, payload);
    return res.data;
});

exports.getApprovalRequestService = asyncHandler(async (payload) => {
    const res = await axios.post(approvalRequestAddress + approvalRequest.get, payload);
    return res.data;
});

exports.getAllApprovalRequestsService = asyncHandler(async () => {
    const res = await axios.get(approvalRequestAddress + approvalRequest.getAll);
    return res.data;
});

exports.deleteApprovalRequestService = asyncHandler(async (payload) => {
    const res = await axios.post(approvalRequestAddress + approvalRequest.delete, payload);
    return res.data;
});

exports.updateApprovalRequestService = asyncHandler(async (payload) => {
    const res = await axios.post(approvalRequestAddress + approvalRequest.update, payload);
    return res.data;
});

exports.getEmployeeWithManagerIdService = asyncHandler(async (payload) => {
    const res = await axios.post(approvalRequestAddress + approvalRequest.getWithManagerId, payload);
    return res.data;
});

exports.getEmployeeWithEmployeeIdService = asyncHandler(async (payload) => {
    const res = await axios.post(approvalRequestAddress + approvalRequest.getWithEmployeeId, payload);
    return res.data;
});