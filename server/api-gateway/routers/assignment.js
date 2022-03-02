const express = require("express");
const {endpoints} = require("../common/constants/endpoints/assignment");

const {
    createAssignmentController,
    deleteAssignmentController,
    getAllAssignmentsController,
    getAssignmentController,
    updateAssignmentController,
    getAssignmentWithEmployeeController,
    getAssignmentWithManagerController
} = require("../controllers/assignment");

const {validateToken, adminAuth, managerAuth} = require("../authorization/token");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    validateToken,
    managerAuth,
    createAssignmentController
);

router.post(
    endpoints.get,
    validateToken,
    adminAuth,
    getAssignmentController
);

router.post(
    endpoints.getAll,
    validateToken,
    adminAuth,
    getAllAssignmentsController
);

router.post(
    endpoints.delete,
    validateToken,
    managerAuth,
    deleteAssignmentController
);

router.put(
    endpoints.update,
    validateToken,
    managerAuth,
    updateAssignmentController
);

router.post(
    endpoints.getWithManager,
    validateToken,
    managerAuth,
    getAssignmentWithManagerController
);

router.post(
    endpoints.getWithEmployee,
    validateToken,
    getAssignmentWithEmployeeController
);
module.exports = router;
