const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const {video, streamingMicroServiceAddress} = require("../common/constants/endpoints/video");
const axios = require('axios');

dotenv.config();

exports.createVideoService = asyncHandler(async (payload) => {
    const res = await axios.post(streamingMicroServiceAddress + video.register, payload);
    return res.data;
});

exports.getVideoService = asyncHandler(async (payload) => {
    const res = await axios.post(streamingMicroServiceAddress + video.get, payload);
    return res.data;
});

exports.getAllVideosService = asyncHandler(async () => {
    const res = await axios.post(streamingMicroServiceAddress + video.getAll);
    return res.data;
});

exports.deleteVideoService = asyncHandler(async (payload) => {
    const res = await axios.post(streamingMicroServiceAddress + video.erase, payload);
    return res.data;
});

exports.updateVideoService = asyncHandler(async (payload) => {
    const res = await axios.put(streamingMicroServiceAddress + video.update, payload);
    return res.data;
});