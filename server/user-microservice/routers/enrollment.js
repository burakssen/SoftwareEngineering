const express = require("express");

const {endpoints} = require("../common/constants/endpoints/enrollment");

const {
    createEnrollmentController,
    deleteEnrollmentController,
    getAllEnrollmentController,
    getEnrollmentController,
    getEnrollmentWithCourseController,
    getEnrollmentWithEmployeeController,
    getEnrollmentWithIdController,
    getEnrollmentsWithCourseIdsAndEmployeeController
} = require("../controllers/enrollment");

const {validationHandler} = require("../utils/validator");
const {requestValidator} = require("../validators/enrollment");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    requestValidator(endpoints.create),
    validationHandler,
    createEnrollmentController
);

router.get(
    endpoints.getAll,
    getAllEnrollmentController
);

router.post(
    endpoints.delete,
    requestValidator(endpoints.delete),
    validationHandler,
    deleteEnrollmentController
);


router.post(
    endpoints.get,
    requestValidator(endpoints.get),
    validationHandler,
    getEnrollmentController
);

router.post(
    endpoints.getWithEmployeeId,
    requestValidator(endpoints.getWithEmployeeId),
    validationHandler,
    getEnrollmentWithEmployeeController
);

router.post(
    endpoints.getWithCourseId,
    requestValidator(endpoints.getWithCourseId),
    validationHandler,
    getEnrollmentWithCourseController
);

router.post(
    endpoints.getWithId,
    requestValidator(endpoints.getWithId),
    validationHandler,
    getEnrollmentWithIdController
);

router.post(
    endpoints.getEnrollmentCourseEmployee,
    getEnrollmentsWithCourseIdsAndEmployeeController
);

module.exports = router;
