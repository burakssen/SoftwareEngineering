const express = require("express");
const { endpoints } = require("../common/constants/endpoints/progress");

const {
    registerProgressController,
    deleteProgressController,
    getProgressController,
    getAllProgressController,
    updateProgressController,
    getWithEmployeeIdController,
    getWithEmployeeIdAndVideoController
} = require("../controllers/progress");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/progress");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    requestValidator(endpoints.create),
    validationHandler,
    registerProgressController
);

router.post(
    endpoints.delete,
    requestValidator(endpoints.delete),
    validationHandler,
    deleteProgressController,
);

router.post(
    endpoints.get,
    requestValidator(endpoints.get),
    validationHandler,
    getProgressController
);

router.post(
    endpoints.getAll,
    getAllProgressController,
);

router.put(
    endpoints.update,
    requestValidator(endpoints.update),
    validationHandler,
    updateProgressController
);

router.post(
    endpoints.getWithEmployeeId,
    requestValidator(endpoints.getWithEmployeeId),
    validationHandler,
    getWithEmployeeIdController
);

router.post(
    endpoints.getWithEmployeeIdVideoId,
    requestValidator(endpoints.getWithEmployeeIdVideoId),
    validationHandler,
    getWithEmployeeIdAndVideoController
);

module.exports = router;