const { videoCourseMatching, course } = require("../models");

const {
    SERVER_ERROR
} = require("../common/constants/statusCodes");

// All database access operations must be handled here.
exports.saveNewVideoCourseMatchingDataAccess = async (newVideoCourseMatching, res) => {
    return await videoCourseMatching.create({
        order: newVideoCourseMatching.order,
        courseId: newVideoCourseMatching.courseId,
        videoId: newVideoCourseMatching.videoId
    });
}

exports.deleteVideoCourseMatchingDataAccess = async (videoCourseMatchingId, res) => {
    return await videoCourseMatching.destroy({
        where: {
            id: videoCourseMatchingId
        },
        returning: true
    });
}

exports.getVideoCourseMatchingDataAccess = async (videoCourseMatchingId, res) => {
    return await videoCourseMatching.findOne({
        where: {
            id: videoCourseMatchingId
        }
    });
}

exports.getAllVideoCourseMatchingsDataAccess = async (res) => {
    return await videoCourseMatching.findAll();
}

exports.updateVideoCourseMatchingDataAccess = async (updatedVideoCourseMatching, res) => {
    const updateRes = await videoCourseMatching.update({
        order: updatedVideoCourseMatching.order,
        courseId: updatedVideoCourseMatching.courseId,
        videoId: updatedVideoCourseMatching.videoId
    }, {
        where: {
            id: updatedVideoCourseMatching.id
        },
        returning: true
    });

    if(updateRes[0] != 0) {
        return updateRes[1][0].dataValues;
    }
    return null;
}

exports.getAllVideosByCourseIdDataAccess = async (desiredCourseId, res) => {
    return await videoCourseMatching.findAll(
        {
            where: {
                courseId: desiredCourseId
            },
        }
    );
}

exports.getAllCoursesByVideoIdDataAccess = async (desiredVideoId, res) => {
    return await videoCourseMatching.findAll(
        {
            where: {
                videoId: desiredVideoId
            },
            include: [
                {
                    model: course,
                    required: false,
                    as: "course",
                    attributes: ["id"]
                }
            ],
            attributes: []
        }
    )
}