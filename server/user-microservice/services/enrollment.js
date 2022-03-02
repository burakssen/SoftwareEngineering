const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const {
    deleteEnrollmentDataAccess,
    createEnrollmentDataAccess,
    getAllEnrollmentDataAccess,
    getEnrollmentDataAccess,
    getEnrollmentsWithCourseDataAccess,
    getEnrollmentWithEmployeeDataAccess,
    getEnrollmentWithIdDataAccess,
    getEnrollmentsWithCourseIdsAndEmployeeDataAccess
} = require("../dataAccess/enrollment");

exports.createEnrollmentService = asyncHandler(async (enrollment) => {
    if (await getEnrollmentDataAccess(enrollment.employeeId, enrollment.courseId)) {
        return {error: "This enrollment already exists!"};
    }

    return await createEnrollmentDataAccess(enrollment);
});

exports.deleteEnrollmentService = asyncHandler(async (enrollmentId) => {
    return await deleteEnrollmentDataAccess(enrollmentId);
});

exports.getAllEnrollmentService = asyncHandler(async () => {
    return await getAllEnrollmentDataAccess();
});

exports.getEnrollmentWithEmployeeService = asyncHandler(async (employeeId) => {
    return await getEnrollmentWithEmployeeDataAccess(employeeId);
});

exports.getEnrollmentWithCourseService = asyncHandler(async (courseId) => {
    return await getEnrollmentsWithCourseDataAccess(courseId);
});

exports.getEnrollmentService = asyncHandler(async (employeeId, courseId) => {
    return await getEnrollmentDataAccess(employeeId, courseId);
});

exports.getEnrollmentWithIdService = asyncHandler(async (enrollmentId) => {
    return await getEnrollmentWithIdDataAccess(enrollmentId);
});

exports.getEnrollmentsWithCourseIdsAndEmployeeService = asyncHandler(async (courseIds, employeeId) => {
    return await getEnrollmentsWithCourseIdsAndEmployeeDataAccess(courseIds, employeeId);
});