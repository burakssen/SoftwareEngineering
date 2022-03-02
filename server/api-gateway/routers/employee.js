const express = require("express");

const {employee} = require("../common/constants/endpoints/user-microservice");

const {
    createEmployeeController,
    deleteEmployeeController,
    getAllEmployeesController,
    getEmployeeController,
    updateEmployeeController,
    getEmployeeWithUsernameController,
    getAllEmployeeRoleController
} = require("../controllers/employee");

const {validateToken, adminAuth, managerAuth} = require("../authorization/token");

//Initializes router
const router = express.Router();

//Calls validators and corresponding function
router.post(
    employee.create,
    validateToken,
    adminAuth,
    createEmployeeController
);

router.post(
    employee.get,
    validateToken,
    managerAuth,
    getEmployeeController
);

router.get(
    employee.getAll,
    validateToken,
    managerAuth,
    getAllEmployeesController
);

router.get(
    employee.getAllEmployeeRole,
    validateToken,
    managerAuth,
    getAllEmployeeRoleController
);

router.post(
    employee.delete,
    validateToken,
    adminAuth,
    deleteEmployeeController
);

router.put(
    employee.update,
    validateToken,
    adminAuth,
    updateEmployeeController
);

router.post(
    employee.getWithUsername,
    validateToken,
    adminAuth,
    getEmployeeWithUsernameController
)

module.exports = router;
