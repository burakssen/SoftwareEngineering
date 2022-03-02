const {enrollment, employee} = require("../models");

exports.createEnrollmentDataAccess = async (_enrollment) => {
    return enrollment.create({..._enrollment, createdAt: Date.now(), updatedAt: Date.now()});
}

exports.getEnrollmentDataAccess = async (employeeId, courseId) => {
    return await enrollment.findOne({where: {employeeId: employeeId, courseId: courseId}});
}

exports.getAllEnrollmentDataAccess = async () => {
    return enrollment.findAll({});
}

exports.deleteEnrollmentDataAccess = async (enrollmentId) => {
    return enrollment.destroy({where: {id: enrollmentId}});
}

exports.getEnrollmentsWithCourseDataAccess = async (courseId) => {
    return enrollment.findAll({where: {courseId: courseId}});
}

exports.getEnrollmentWithEmployeeDataAccess = async (employeeId) => {
    return enrollment.findAll({
        where: {
            employeeId: employeeId
        },
        include: [
            {
                model: employee,
                required: false,
                as: 'employee'
            }
        ]
    });
}

exports.getEnrollmentWithIdDataAccess = async (enrollmentId) => {
    return enrollment.findOne({where: {id: enrollmentId}});
}

exports.getEnrollmentsWithCourseIdsAndEmployeeDataAccess = async (courseIds, employeeId) => {
    return enrollment.findAll({
        where: {courseId: courseIds, employeeId:employeeId}
    });
}



