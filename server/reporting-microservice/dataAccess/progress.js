const { progress } = require("../models");

const {
    SERVER_ERROR
} = require("../common/constants/statusCodes");
const {Op} = require("sequelize");

// All database access operations must be handled here.
exports.saveNewProgressDataAccess = async (newProgress, res) => {
    return await progress.create({
        watchedTime: newProgress.watchedTime,
        employeeId: newProgress.employeeId,
        videoId: newProgress.videoId
    });
}

exports.deleteProgressDataAccess = async (progressId, res) => {
    return await progress.destroy({
        where: {
            id: progressId
        },
        returning: true
    });
}

exports.getProgressDataAccess = async (progressId, res) => {
    return await progress.findOne({
        where: {
            id: progressId
        }
    });
}

exports.getAllProgressDataAccess = async (res) => {
    return await progress.findAll();
}

exports.updateProgressDataAccess = async (updatedProgress, res) => {
    const updateRes = await progress.update({
        watchedTime: updatedProgress.watchedTime,
        employeeId: updatedProgress.employeeId,
        videoId: updatedProgress.videoId
    }, {
        where: {
            employeeId: updatedProgress.employeeId,
            videoId: updatedProgress.videoId,
            watchedTime: {
                [Op.lt]: updatedProgress.watchedTime
            }
        },
        returning: true
    });
    if(updateRes[0] !== 0) {
        return updateRes[1][0].dataValues;
    }
    return null;
}

exports.getWithEmployeeIdDataAccess = async (employeeId, res) => {
    return await progress.findAll({
        where: {
            employeeId: employeeId
        }
    });
}

exports.getWithEmployeeIdAndVideoDataAccess = async (employeeId, videoId, res) => {
    return await progress.findOne({
        where: {
            employeeId: employeeId,
            videoId: videoId
        }
    });
}