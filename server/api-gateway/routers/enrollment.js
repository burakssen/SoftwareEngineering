const express = require("express");

const {
    getEnrollmentController,
    deleteEnrollmentController,
    createEnrollmentController,
    getAllEnrollmentsController,
    getEnrollmentWithCourseIdController,
    getEnrollmentWithEmployeeIdController,
    getEnrollmentWithIdController
} = require("../controllers/enrollment");

const {validateToken, adminAuth, managerAuth} = require("../authorization/token");
const {enrollment} = require("../common/constants/endpoints/user-microservice");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    enrollment.create,
    validateToken,
    managerAuth,
    createEnrollmentController
);

router.post(
    enrollment.get,
    validateToken,
    adminAuth,
    getEnrollmentController
);

router.get(
    enrollment.getAll,
    validateToken,
    adminAuth,
    getAllEnrollmentsController
);

router.post(
    enrollment.delete,
    validateToken,
    adminAuth,
    deleteEnrollmentController
);

router.post(
    enrollment.getWithCourseId,
    validateToken,
    getEnrollmentWithCourseIdController
);

router.post(
    enrollment.getWithEmployeeId,
    validateToken,
    getEnrollmentWithEmployeeIdController
)

router.post(
    enrollment.getWithId,
    validateToken,
    adminAuth,
    getEnrollmentWithIdController
)

module.exports = router;