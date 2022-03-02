const express = require("express");

const { endpoints } = require("../common/constants/endpoints/assignment");

const { 
  registerAssignmentController, 
  deleteAssignmentController, 
  getAssignmentController, 
  getAllAssignmentsController,
  updateAssignmentController,
  getAssignmentsWithEmployeeIdController,
  getAssignmentsWithManagerIdController,
} = require("../controllers/assignment");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/assignment");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
  endpoints.create,
  requestValidator(endpoints.create),
  validationHandler,
  registerAssignmentController
);

router.post(
  endpoints.delete,
  requestValidator(endpoints.delete),
  validationHandler,
  deleteAssignmentController,
);

router.get(
  endpoints.get,
  requestValidator(endpoints.get),
  validationHandler,
  getAssignmentController
);

router.post(
  endpoints.getAll,
  getAllAssignmentsController,
);

router.put(
  endpoints.update,
  requestValidator(endpoints.update),
  validationHandler,
  updateAssignmentController
);

router.post(
    endpoints.getWithEmployee,
    requestValidator(endpoints.getWithEmployee),
    validationHandler,
    getAssignmentsWithEmployeeIdController,
);

router.post(
    endpoints.getWithManager,
    requestValidator(endpoints.getWithManager),
    validationHandler,
    getAssignmentsWithManagerIdController,
);

module.exports = router;