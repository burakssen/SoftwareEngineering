const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {SUCCESS, BAD_REQUEST} = require("../common/constants/statusCodes");

const {
    createEnrollmentService,
    deleteEnrollmentService,
    getAllEnrollmentService,
    getEnrollmentWithCourseService,
    getEnrollmentWithIdService,
    getEnrollmentService,
    getEnrollmentWithEmployeeService,
    getEnrollmentsWithCourseIdsAndEmployeeService
} = require("../services/enrollment");


exports.getEnrollmentController = asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await getEnrollmentService(body.employeeId, body.courseId);
    res.status(SUCCESS).json({enrollment: result});
});

exports.createEnrollmentController = asyncHandler(async (req, res) => {
    const result = await createEnrollmentService(req.body);
    console.log(result);
    if (result.error) {
        return res.status(BAD_REQUEST).json(result);
    }
    return res.status(SUCCESS).json({enrollment: result});
});

exports.deleteEnrollmentController = asyncHandler(async (req, res) => {
    const result = await deleteEnrollmentService(req.body.enrollmentId);
    return res.status(SUCCESS).json({enrollment: result});
});

exports.getAllEnrollmentController = asyncHandler(async (req, res) => {
    const result = await getAllEnrollmentService();
    return res.status(SUCCESS).json({enrollments: result});
});

exports.getEnrollmentWithEmployeeController = asyncHandler(async (req, res) => {
    const result = await getEnrollmentWithEmployeeService(req.body.employeeId);
    return res.status(SUCCESS).json({enrollments: result});
});

exports.getEnrollmentWithCourseController = asyncHandler(async (req, res) => {
    const result = await getEnrollmentWithCourseService(req.body.courseId);
    return res.status(SUCCESS).json({enrollments: result});
});

exports.getEnrollmentWithIdController = asyncHandler(async (req, res) => {
    const result = await getEnrollmentWithIdService(req.body.enrollmentId);
    res.status(SUCCESS).json({result});
});

exports.getEnrollmentsWithCourseIdsAndEmployeeController = asyncHandler(async (req, res) => {
    const result = await getEnrollmentsWithCourseIdsAndEmployeeService(req.body.courseIds, req.body.employeeId);
    res.status(SUCCESS).json({result});
});
