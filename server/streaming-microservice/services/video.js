const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const { 
    saveNewVideoDataAccess, 
    getVideoDataAccess,
    getAllVideoDataAccess,
    eraseVideoDataAccess,
    updateVideoDataAccess
} = require("../dataAccess/video");

exports.registerVideoService = asyncHandler(async (videoBody, res) => {
    return await saveNewVideoDataAccess(videoBody, res);
});

exports.getVideoService = asyncHandler(async (videoId, res) => {
    return await getVideoDataAccess(videoId, res);
});

exports.getAllVideoService = asyncHandler(async (res) => {
    return await getAllVideoDataAccess(res);
});

exports.eraseVideoService = asyncHandler(async (videoId, res) => {
    return await eraseVideoDataAccess(videoId, res);
});

exports.updateVideoService = asyncHandler(async (videoBody, res) => {
    return await updateVideoDataAccess(videoBody, res);
});