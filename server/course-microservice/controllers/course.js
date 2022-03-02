const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

dotenv.config();

const {
    SUCCESS,
    SERVER_ERROR
} = require("../common/constants/statusCodes");

const {
    registerCourseService,
    deleteCourseService,
    getCourseService,
    getAllCoursesService,
    updateCourseService,
    getEnrolledCoursesByEmployeeIdService
} = require("../services/Course");


// @desc      Create a new Course
// @route     POST /api/course/createCourse
// @access    Public
exports.registerCourseController = asyncHandler(async (req, res) => {
    const result = await registerCourseService(req.body, res);
    res.status(SUCCESS).json({ newCourse : result});
});


// @desc      Delete existing Course with given id
// @route     POST /api/course/deleteCourse
// @access    Public
exports.deleteCourseController = asyncHandler(async (req, res) => {
    const result = await deleteCourseService(req.body.id, res);
    if(result == 0){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ deletedCourse: result});
    }
});


// @desc      Get existing Course with given id
// @route     GET /api/course/getCourse
// @access    Public
exports.getCourseController = asyncHandler(async (req, res) => {
    const result = await getCourseService(req.body.id, res);
    if(result == null){
        res.status(SERVER_ERROR).json({err : "There is no record with given Id"})
    }else{
        res.status(SUCCESS).json({ course : result});
    }
});


// @desc      Get all existing categories
// @route     GET /api/course/getAllCategories
// @access    Public
exports.getAllCoursesController = asyncHandler(async (req, res) => {
    const result = await getAllCoursesService(res);
    res.status(SUCCESS).json({ allCourses : result});
});


// @desc      Update existing Course with given id
// @route     GET /api/course/updateCourse
// @access    Public
exports.updateCourseController = asyncHandler(async (req, res) => {
    const result = await updateCourseService(req.body, res);
    if(result == null){
        res.status(SERVER_ERROR).json({ err : "There is no record with given Id"});
    }else{
        res.status(SUCCESS).json({ updatedCourse : result});
    }
});

// @desc      Get all enrolled Courses of an employee
// @route     GET /api/course/getCoursesOfEmployee
// @access    Public
exports.getEnrolledCoursesByEmployeeIdController = asyncHandler(async (req, res) => {
    const result = await getEnrolledCoursesByEmployeeIdService(req.body.employeeId);
    res.status(SUCCESS).json({ result });
});