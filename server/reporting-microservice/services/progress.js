const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const {
    saveNewProgressDataAccess,
    deleteProgressDataAccess,
    getProgressDataAccess,
    getAllProgressDataAccess,
    updateProgressDataAccess,
    getWithEmployeeIdDataAccess,
    getWithEmployeeIdAndVideoDataAccess
} = require("../dataAccess/progress");

exports.registerProgressService = asyncHandler(async (newProgress, res) => {
    return await saveNewProgressDataAccess(newProgress, res);
});

exports.deleteProgressService = asyncHandler(async (progressId, res) => {
    return await deleteProgressDataAccess(progressId, res);
});

exports.getProgressService = asyncHandler(async (progressId, res) => {
    return await getProgressDataAccess(progressId, res);
});

exports.getAllProgressService = asyncHandler(async (res) => {
    return await getAllProgressDataAccess(res);
});

exports.updateProgressService = asyncHandler(async (updatedProgress, res) => {
    return await updateProgressDataAccess(updatedProgress, res);
});

exports.getWithEmployeeIdService = asyncHandler( async (employeeId, res) =>{
   return await getWithEmployeeIdDataAccess(employeeId, res);
});

exports.getWithEmployeeIdAndVideoService = asyncHandler( async (employeeId, videoId, res) =>{
    return await getWithEmployeeIdAndVideoDataAccess(employeeId, videoId, res);
});