const express = require("express");

const {endpoints} = require("../common/constants/endpoints/employee");

const {
    createEmployeeController,
    deleteEmployeeController,
    getAllEmployeesController,
    getEmployeeController,
    updateEmployeeController,
    getEmployeeWithUsernameController,
    getEmployeesWithEmployeeRoleService
} = require("../controllers/employee");

const {validationHandler} = require("../utils/validator");
const {requestValidator} = require("../validators/employee");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    endpoints.create,
    requestValidator(endpoints.create),
    validationHandler,
    createEmployeeController
);

router.post(
    endpoints.get,
    requestValidator(endpoints.get),
    validationHandler,
    getEmployeeController
);

router.post(
    endpoints.getAll,
    getAllEmployeesController
);

router.post(
    endpoints.getAllEmployeeRole,
    getEmployeesWithEmployeeRoleService
);

router.post(
    endpoints.delete,
    requestValidator(endpoints.delete),
    validationHandler,
    deleteEmployeeController
);

router.put(
    endpoints.update,
    requestValidator(endpoints.update),
    validationHandler,
    updateEmployeeController
);

router.post(
    endpoints.getWithUsername,
    requestValidator(endpoints.getWithUsername),
    validationHandler,
    getEmployeeWithUsernameController
)

module.exports = router;
