const { link, course } = require("../models");

const {
    SERVER_ERROR
} = require("../common/constants/statusCodes");

// All database access operations must be handled here.
exports.saveNewLinkDataAccess = async (newLink, res) => {
    return await link.create({
        platform: newLink.platform,
        meetingLink: newLink.meetingLink,
        meetingTime: newLink.meetingTime,
        capacity: newLink.capacity,
        courseId: newLink.courseId
    });
}

exports.deleteLinkDataAccess = async (linkId, res) => {
    return await link.destroy({
        where: {
            id: linkId
        },
        returning: true
    });
}

exports.getLinkDataAccess = async (linkId, res) => {
    return await link.findOne({
        where: {
            id: linkId
        }
    });
}

exports.getAllLinksDataAccess = async (res) => {
    return await link.findAll({
        where: {

        },
        include: [
            {
                model: course,
                required: true,
                as: 'course'
            }
        ]

    });
}

exports.updateLinkDataAccess = async (updatedLink, res) => {
    const updateRes = await link.update({
        platform: updatedLink.platform,
        meetingLink: updatedLink.meetingLink,
        meetingTime: updatedLink.meetingTime,
        capacity: updatedLink.capacity,
        courseId: updatedLink.courseId
    }, {
        where: {
            id: updatedLink.id
        },
        returning: true
    });

    if(updateRes[0] != 0) {
        return updateRes[1][0].dataValues;
    }
    return null;
}