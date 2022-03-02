const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {endpoints, courseMicroServiceAddress} = require("../common/constants/endpoints/link");
const axios = require('axios');

dotenv.config();

exports.createLinkService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.create, payload);
    return res.data;
});

exports.getLinkService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.get, payload);
    return res.data;
});

exports.getAllLinksService = asyncHandler(async () => {
    const res = await axios.get(courseMicroServiceAddress + endpoints.getAll);
    return res.data;
});

exports.deleteLinkService = asyncHandler(async (payload) => {
    const res = await axios.post(courseMicroServiceAddress + endpoints.delete, payload);
    return res.data;
});

exports.updateLinkService = asyncHandler(async (payload) => {
    const res = await axios.put(courseMicroServiceAddress + endpoints.update, payload);
    return res.data;
});