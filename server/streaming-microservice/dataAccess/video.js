const {video} = require("../models");
const {BAD_REQUEST} = require("../common/constants/statusCodes");

exports.saveNewVideoDataAccess = async (videoBody, res) => {
    const newVideo = await video.create({
        title: videoBody.title,
        description: videoBody.description,
        duration: videoBody.duration,
        videoPath: videoBody.videoPath,
        coverPhoto: videoBody.coverPhoto
    });
    return newVideo.dataValues;
}

exports.getVideoDataAccess = async (videoId, res) => {

    return await video.findOne({
            where: {
                id: videoId
            }
        });
}

exports.getAllVideoDataAccess = async (res) => {
    return await video.findAll({});
}

exports.eraseVideoDataAccess = async (videoId, res) => {
    return await video.destroy({
            where: {
                id: videoId
            }
    });
}

exports.updateVideoDataAccess = async (videoBody, res) => {
    return await video.update(
        {
            title: videoBody.title,
            description: videoBody.description,
            duration: videoBody.duration,
            videoPath: videoBody.videoPath,
            coverPhoto: videoBody.coverPhoto
        },
        {
            where: {
                id: videoBody.id
            }
        });
}


