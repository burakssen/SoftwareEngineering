const express = require("express");

const {approvalRequest} = require("../common/constants/endpoints/user-microservice");

const {
    updateApprovalRequestController,
    getApprovalRequestController,
    deleteApprovalRequestController,
    getAllApprovalRequestsController,
    createApprovalRequestController,
    getApprovalRequestWithEmployeeIdController,
    getApprovalRequestWithManagerIdController
} = require("../controllers/approvalRequest");

const {validateToken, adminAuth, managerAuth} = require("../authorization/token");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    approvalRequest.create,
    validateToken,
    createApprovalRequestController
);

router.post(
    approvalRequest.get,
    validateToken,
    managerAuth,
    getApprovalRequestController
);

router.get(
    approvalRequest.getAll,
    validateToken,
    adminAuth,
    getAllApprovalRequestsController
);

router.post(
    approvalRequest.delete,
    validateToken,
    adminAuth,
    deleteApprovalRequestController
);

router.put(
    approvalRequest.update,
    validateToken,
    managerAuth,
    updateApprovalRequestController
);

router.post(
    approvalRequest.getWithEmployeeId,
    validateToken,
    getApprovalRequestWithEmployeeIdController
)

router.post(
    approvalRequest.getWithManagerId,
    validateToken,
    managerAuth,
    getApprovalRequestWithManagerIdController
)

module.exports = router;