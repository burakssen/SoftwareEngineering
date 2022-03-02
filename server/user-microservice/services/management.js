const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
dotenv.config();

const {
    createManagementDataAccess,
    deleteManagementDataAccess,
    getAllManagementDataAccess,
    getManagementWithEmployeeDataAccess,
    getManagementWithManagerDataAccess,
    getManagementDataAccess,
    getManagementWithId
} = require("../dataAccess/management");
const {isManagerService} = require("./employee");

exports.createManagementService = asyncHandler(async (management) => {
    if (management.employeeId === management.managerId) {
        return {error: "Manager and employee must be different"};
    }

    if (!await isManagerService(management.managerId)) {
        return {error: "Please provide a manager."};
    }

    if ((await getManagementDataAccess(management.employeeId, management.managerId))) {
        return {error: "This management already exists!"};
    }

    return await createManagementDataAccess(management);
});

exports.deleteManagementService = asyncHandler(async (managementId) => {
    return await deleteManagementDataAccess(managementId);
});

exports.getAllManagementService = asyncHandler(async () => {
    return await getAllManagementDataAccess();
});

exports.getManagementWithEmployeeService = asyncHandler(async (employeeId) => {
    return await getManagementWithEmployeeDataAccess(employeeId);
});

exports.getManagementWithManagerService = asyncHandler(async (managerId) => {
    return await getManagementWithManagerDataAccess(managerId);
});

exports.getManagementService = asyncHandler(async (employeeId, managerId) => {
    return await getManagementDataAccess(employeeId, managerId);
});

exports.getManagementWithIdService = asyncHandler(async (managementId) => {
    return await getManagementWithId(managementId);
});