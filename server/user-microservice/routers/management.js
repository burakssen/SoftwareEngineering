const express = require("express");

const {endpoints} = require("../common/constants/endpoints/management");

const {
    createManagementController,
    deleteManagementController,
    getAllManagementController,
    getManagementController,
    getManagementWithEmployeeController,
    getManagementWithIdController,
    getManagementWithManagerController,
} = require("../controllers/management");

const {validationHandler} = require("../utils/validator");
const {requestValidator} = require("../validators/management");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    requestValidator(endpoints.create),
    validationHandler,
    createManagementController
);

router.get(
    endpoints.getAll,
    getAllManagementController
);

router.post(
    endpoints.delete,
    requestValidator(endpoints.delete),
    validationHandler,
    deleteManagementController
);


router.post(
    endpoints.get,
    requestValidator(endpoints.get),
    validationHandler,
    getManagementController
);

router.post(
    endpoints.getWithEmployeeId,
    requestValidator(endpoints.getWithEmployeeId),
    validationHandler,
    getManagementWithEmployeeController
);

router.post(
    endpoints.getWithManagerId,
    requestValidator(endpoints.getWithManagerId),
    validationHandler,
    getManagementWithManagerController
);

router.post(
    endpoints.getWithId,
    requestValidator(endpoints.getWithId),
    validationHandler,
    getManagementWithIdController
);


module.exports = router;
