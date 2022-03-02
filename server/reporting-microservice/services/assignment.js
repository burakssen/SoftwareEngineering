const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const {
    saveNewAssignmentDataAccess,
    deleteAssignmentDataAccess,
    getAssignmentDataAccess,
    getAllAssignmentsDataAccess,
    updateAssignmentDataAccess,
    getAssignmentsWithManagementsDataAccess,
    getAssignmentWithEnrollmentIdDataAccess
} = require("../dataAccess/assignment");

const {getManagementServiceCaller, getEnrollmentServiceCaller, getManagementWithEmployeeServiceCaller,
    getManagementWithManagerServiceCaller, getManagementWithIdServiceCaller, createEnrollmentServiceCaller
} = require("../serviceCallers/user");
const {SUCCESS} = require("../common/constants/statusCodes");

exports.registerAssignmentService = asyncHandler(async (assignment, res) => {

    if(assignment.employeeId === assignment.managerId){
        return {error: "Employee cannot be same as manager"};
    }
    const {management} = await getManagementServiceCaller({employeeId: assignment.employeeId, managerId: assignment.managerId});

    if(management == null){
        return {error: "Management does not exist"};
    }
    assignment.managementId = management.id;
    let {enrollment} = await getEnrollmentServiceCaller({employeeId: assignment.employeeId, courseId: assignment.courseId});

    if(enrollment == null){
        enrollment = await createEnrollmentServiceCaller({employeeId: assignment.employeeId, courseId: assignment.courseId});
        assignment.enrollmentId = enrollment.enrollment.id;
        if(enrollment.error){
            return res.status(200).json({error: enrollment.error})
        }

        let employee = await axios.post("http://localhost:8080/api/employees/get", {
            id: assignment.employeeId
        }, {withCredentials: true});

        employee = employee.data.employee;

        await axios.post("http://localhost:5005/api/notification/sendNotification", {
            receiver: employee.email,
            subject: "New Training Assignment",
            message: "You have assigned to new training!"
        }, {withCredentials: true});

        return await saveNewAssignmentDataAccess(assignment, res);
    }

    return {};
});

exports.deleteAssignmentService = asyncHandler(async (assignmentId, managerId, res) => {
    if(managerId !== -1){
        const assignment = (await getAssignmentDataAccess(assignmentId, res)).dataValues;
        const management = (await getManagementWithIdServiceCaller({managementId: assignment.managementId})).result;
        if(management.managerId !== managerId){
            return {error: "Manager has not any authority for this assignment"};
        }
    }
    return await deleteAssignmentDataAccess(assignmentId, res);
});

exports.getAssignmentService = asyncHandler(async (assignmentId, res) => {
    return await getAssignmentDataAccess(assignmentId, res);
});

exports.getAllAssignmentsService = asyncHandler(async (res) => {
    return await getAllAssignmentsDataAccess(res);
});

exports.updateAssignmentService = asyncHandler(async (updatedAssignment, res) => {
    if(updatedAssignment.managerId !== -1){
        const assignment = (await getAssignmentDataAccess(updatedAssignment.id, res)).dataValues;
        const management = (await getManagementWithIdServiceCaller({managementId: assignment.managementId})).result;
        if(management.managerId !== updatedAssignment.managerId){
            return {error: "Manager has not any authority for this assignment"};
        }
    }
    return await updateAssignmentDataAccess(updatedAssignment, res);
});

exports.getAssignmentsWithEmployeeIdService = asyncHandler(async (employeeId, res) => {
    const {managements} = await getManagementWithEmployeeServiceCaller({employeeId});
    let managementIds = [];
    managements.forEach(management => {
        managementIds.push(management.id);
    });

    return await getAssignmentsWithManagementsDataAccess(managementIds, res);
});

exports.getAssignmentsWithManagerIdService = asyncHandler(async (managerId, res) => {
    const {managements} = await getManagementWithManagerServiceCaller({managerId});
    let managementIds = [];
    managements.forEach(management => {
        managementIds.push(management.id);
    });

    return await getAssignmentsWithManagementsDataAccess(managementIds, res);
});