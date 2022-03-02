const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const {
    saveNewVideoCourseMatchingDataAccess,
    deleteVideoCourseMatchingDataAccess,
    getVideoCourseMatchingDataAccess,
    getAllVideoCourseMatchingsDataAccess,
    updateVideoCourseMatchingDataAccess,
    getAllVideosByCourseIdDataAccess,
    getAllCoursesByVideoIdDataAccess
} = require("../dataAccess/VideoCourseMatching");

exports.registerVideoCourseMatchingService = asyncHandler(async (newVideoCourseMatching, res) => {
    return await saveNewVideoCourseMatchingDataAccess(newVideoCourseMatching, res);
});

exports.deleteVideoCourseMatchingService = asyncHandler(async (videoVideoCourseMatchingMatchingId, res) => {
    return await deleteVideoCourseMatchingDataAccess(videoVideoCourseMatchingMatchingId, res);
});

exports.getVideoCourseMatchingService = asyncHandler(async (videoVideoCourseMatchingMatchingId, res) => {
    return await getVideoCourseMatchingDataAccess(videoVideoCourseMatchingMatchingId, res);
});

exports.getAllVideoCourseMatchingsService = asyncHandler(async (res) => {
    return await getAllVideoCourseMatchingsDataAccess(res);
});

exports.updateVideoCourseMatchingService = asyncHandler(async (updatedVideoCourseMatching, res) => {
    return await updateVideoCourseMatchingDataAccess(updatedVideoCourseMatching, res);
});

exports.getAllVideosByCourseIdService = asyncHandler(async (desiredVideoId, res) => {
    const allVideoCourseMatchings = await getAllVideosByCourseIdDataAccess(desiredVideoId, res);
    const allVideoIds = {};
    allVideoIds['allVideos'] = []
    allVideoCourseMatchings.forEach(function(table) {
        let videoId = table.videoId;
        let data = {
            id: videoId
        };
        allVideoIds['allVideos'].push(data);
    });

    return allVideoIds;
});

exports.getAllCoursesByVideoIdService = asyncHandler(async (desiredVideoId, res) => {
    return await getAllCoursesByVideoIdDataAccess(desiredVideoId, res);
});