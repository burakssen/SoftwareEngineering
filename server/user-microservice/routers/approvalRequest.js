const express = require("express");

const {
    createApprovalRequestController,
    deleteApprovalRequestController,
    getAllApprovalRequestsController,
    getApprovalRequestController,
    getApprovalRequestsWithEmployeeController,
    getApprovalRequestsWithManagerController,
    updateApprovalRequestController
} = require("../controllers/approvalRequest");

const {validationHandler} = require("../utils/validator");
const {requestValidator} = require("../validators/approvalRequest");
const {endpoints} = require("../common/constants/endpoints/approvalRequest");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    requestValidator(endpoints.create),
    validationHandler,
    createApprovalRequestController
);

router.get(
    endpoints.getAll,
    getAllApprovalRequestsController
);

router.post(
    endpoints.delete,
    requestValidator(endpoints.delete),
    validationHandler,
    deleteApprovalRequestController
);


router.post(
    endpoints.get,
    requestValidator(endpoints.get),
    validationHandler,
    getApprovalRequestController
);

router.post(
    endpoints.getWithEmployeeId,
    requestValidator(endpoints.getWithEmployeeId),
    validationHandler,
    getApprovalRequestsWithEmployeeController
);

router.post(
    endpoints.getWithManagerId,
    requestValidator(endpoints.getWithManagerId),
    validationHandler,
    getApprovalRequestsWithManagerController
);

router.post(
    endpoints.update,
    requestValidator(endpoints.update),
    validationHandler,
    updateApprovalRequestController
);

module.exports = router;
