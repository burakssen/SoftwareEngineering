const { course, category, videoCourseMatching } = require("../models");

const {
    SERVER_ERROR
} = require("../common/constants/statusCodes");

// All database access operations must be handled here.
exports.saveNewCourseDataAccess = async (newCourse, res) => {
    return await course.create({
        name: newCourse.name,
        description: newCourse.description,
        coverPhotoPath: newCourse.coverPhotoPath,
        duration: newCourse.duration,
        isLive: newCourse.isLive,
        categoryId: newCourse.categoryId
    });
}

exports.deleteCourseDataAccess = async (courseId, res) => {
    return await course.destroy({
        where: {
            id: courseId
        },
        returning: true
    });
}

exports.getCourseDataAccess = async (courseId, res) => {
    return await course.findOne({
        where: {
            id: courseId,
            isLive: false
        },
        include: [
            {
                model: category,
                required: true,
                as: "category"
            },
            {
                model: videoCourseMatching,
                as: "videos"
            }
        ]
    });
}

exports.getAllCoursesDataAccess = async (res) => {
    return await course.findAll(
        {
            include: [
                {
                    model: category,
                    required: true,
                    as: "category"
                },
                {
                    model: videoCourseMatching,
                    as: "videos"
                }
            ]
        }
    );
}

exports.updateCourseDataAccess = async (updatedCourse, res) => {
    const updateRes = await course.update({
        name: updatedCourse.name,
        description: updatedCourse.description,
        coverPhotoPath: updatedCourse.coverPhotoPath,
        duration: updatedCourse.duration,
        isLive: updatedCourse.isLive,
        categoryId: updatedCourse.categoryId
    }, {
        where: {
            id: updatedCourse.id
        },
        returning: true
    });

    if(updateRes[0] != 0) {
        return updateRes[1][0].dataValues;
    }
    return null;
}