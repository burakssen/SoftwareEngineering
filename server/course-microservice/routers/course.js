const express = require("express");
const { endpoints } = require("../common/constants/endpoints/course");

const {
    registerCourseController,
    deleteCourseController,
    getCourseController,
    getAllCoursesController,
    updateCourseController,
    getEnrolledCoursesByEmployeeIdController
} = require("../controllers/course");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/course");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    requestValidator(endpoints.create),
    validationHandler,
    registerCourseController
);

router.post(
    endpoints.delete,
    requestValidator(endpoints.delete),
    validationHandler,
    deleteCourseController,
);

router.post(
    endpoints.get,
    requestValidator(endpoints.get),
    validationHandler,
    getCourseController
);

router.post(
    endpoints.getAll,
    getAllCoursesController,
);

router.put(
    endpoints.update,
    requestValidator(endpoints.update),
    validationHandler,
    updateCourseController
);

router.post(
    endpoints.getAllCoursesOfEmployee,
    requestValidator(endpoints.getAllCoursesOfEmployee),
    validationHandler,
    getEnrolledCoursesByEmployeeIdController
);

module.exports = router;