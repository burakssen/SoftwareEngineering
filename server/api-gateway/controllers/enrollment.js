const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {SUCCESS} = require("../common/constants/statusCodes");
const {MANAGER, EMPLOYEE} = require("../common/constants/roles");

const {
    getEnrollmentWithIdService,
    getEnrollmentService,
    createEnrollmentService,
    deleteEnrollmentService,
    getEnrollmentWithCourseIdService,
    getEnrollmentWithEmployeeIdService,
    getAllEnrollmentsService
} = require("../serviceCallers/enrollment");

exports.createEnrollmentController = asyncHandler(async (req, res) => {
    const result = await createEnrollmentService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getEnrollmentController = asyncHandler(async (req, res) => {
    const result = await getEnrollmentService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getAllEnrollmentsController = asyncHandler(async (req, res) => {
    const result = await getAllEnrollmentsService();
    res.status(SUCCESS).json({...result});
});

exports.deleteEnrollmentController = asyncHandler(async (req, res) => {
    const result = await deleteEnrollmentService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getEnrollmentWithCourseIdController = asyncHandler(async (req, res) => {
    const result = await getEnrollmentWithCourseIdService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getEnrollmentWithIdController = asyncHandler(async (req, res) => {
    const result = await getEnrollmentWithIdService(req.body);
    res.status(SUCCESS).json({...result});
});

exports.getEnrollmentWithEmployeeIdController = asyncHandler(async (req, res) => {

    if (req.role === EMPLOYEE || req.role === MANAGER) {
        req.body.employeeId = req.body.id;
    }

    const result = await getEnrollmentWithEmployeeIdService(req.body);
    res.status(SUCCESS).json({...result});
});