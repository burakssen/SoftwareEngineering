const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const {
    saveNewCourseDataAccess,
    deleteCourseDataAccess,
    getCourseDataAccess,
    getAllCoursesDataAccess,
    updateCourseDataAccess
} = require("../dataAccess/Course");

exports.registerCourseService = asyncHandler(async (newCourse, res) => {
    return await saveNewCourseDataAccess(newCourse, res);
});

exports.deleteCourseService = asyncHandler(async (courseId, res) => {
    return await deleteCourseDataAccess(courseId, res);
});

exports.getCourseService = asyncHandler(async (courseId, res) => {
    return await getCourseDataAccess(courseId, res);
});

exports.getAllCoursesService = asyncHandler(async (res) => {
    return await getAllCoursesDataAccess(res);
});

exports.updateCourseService = asyncHandler(async (updatedCourse, res) => {
    return await updateCourseDataAccess(updatedCourse, res);
});

exports.getEnrolledCoursesByEmployeeIdService = asyncHandler(async (employeeId) => {
    let url = "http://localhost:8080/api/enrollment/get/employeeId"
    const res = await axios.post(url,
    {
        employeeId: employeeId
    }, {withCredentials: true});
    const enrollments = res.data.enrollments;

    enrolledCourses = {}
    enrolledCourses['enrolledCourses'] = []

    for(let i=0; i<enrollments.length; i++){
        let enr = enrollments[i];
        let courseId = enr.courseId;
        const course = await getCourseDataAccess(courseId);
        enrolledCourses['enrolledCourses'].push(course);
    }

    return enrolledCourses;
});