const express = require("express");
const {endpoints} = require("../common/constants/endpoints/progress");

const {
    createProgressController,
    deleteProgressController,
    getAllProgressController,
    getProgressController,
    updateProgressController,
    getProgressWithEmployeeIdController,
    getProgressWithEmployeeIdVideoIdController
} = require("../controllers/progress");

const {validateToken, adminAuth, managerAuth} = require("../authorization/token");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    validateToken,
    createProgressController
);

router.post(
    endpoints.get,
    validateToken,
    managerAuth,
    getProgressController
);

router.post(
    endpoints.getAll,
    validateToken,
    adminAuth,
    getAllProgressController
);

router.post(
    endpoints.delete,
    validateToken,
    adminAuth,
    deleteProgressController
);

router.put(
    endpoints.update,
    validateToken,
    updateProgressController
);

router.post(
    endpoints.getProgressWithEmployeeId,
    validateToken,
    getProgressWithEmployeeIdController
);

router.post(
    endpoints.getProgressWithEmployeeIdVideoId,
    validateToken,
    getProgressWithEmployeeIdVideoIdController
);

module.exports = router;
