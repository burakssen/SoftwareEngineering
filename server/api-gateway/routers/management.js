const express = require("express");

const {management} = require("../common/constants/endpoints/user-microservice");

const {
    getManagementWithIdController,
    getManagementWithEmployeeController,
    getManagementController,
    deleteManagementController,
    createManagementController,
    getManagementWithManagerController,
    getAllManagementsController
} = require("../controllers/management");

const {validateToken, adminAuth, managerAuth} = require("../authorization/token");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    management.create,
    validateToken,
    adminAuth,
    createManagementController
);

router.post(
    management.get,
    validateToken,
    adminAuth,
    getManagementController
);

router.get(
    management.getAll,
    validateToken,
    adminAuth,
    getAllManagementsController
);

router.post(
    management.delete,
    validateToken,
    adminAuth,
    deleteManagementController
);

router.post(
    management.getWithManagerId,
    validateToken,
    managerAuth,
    getManagementWithManagerController
);

router.post(
    management.getWithEmployeeId,
    validateToken,
    getManagementWithEmployeeController
)

router.post(
    management.getWithId,
    validateToken,
    adminAuth,
    getManagementWithIdController
)

module.exports = router;
