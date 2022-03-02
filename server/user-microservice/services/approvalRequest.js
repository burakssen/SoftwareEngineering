const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const {
    createApprovalRequestDataAccess,
    deleteApprovalRequestDataAccess,
    getAllApprovalRequestsDataAccess,
    getApprovalRequestDataAccess,
    getApprovalRequestsWithEmployeeDataAccess,
    getApprovalRequestsWithEmployeeAndCourseDataAccess,
    getApprovalRequestsWithEmployeesDataAccess,
    updateApprovalRequestDataAccess
} = require("../dataAccess/approvalRequests");

const {getEnrollmentDataAccess, createEnrollmentDataAccess} = require("../dataAccess/enrollment");
const {getManagementWithManagerDataAccess, getManagementDataAccess} = require("../dataAccess/management");
const {status} = require("../common/constants/endpoints/approvalRequest");

exports.createApprovalRequestService = asyncHandler(async (approvalRequest) => {
    if ((await getApprovalRequestsWithEmployeeAndCourseDataAccess(approvalRequest.employeeId, approvalRequest.courseId)).length > 0) {
        return {error: "This course already requested"};
    }
    if (await getEnrollmentDataAccess(approvalRequest.employeeId, approvalRequest.courseId)) {
        return {error: "Already enrolled to course"};
    }

    let managements = await axios.post("http://localhost:8080/api/management/get/employeeId", {
        employeeId: approvalRequest.employeeId
    }, {withCredentials: true});

    managements = managements.data.managements
    //console.log(managements.data.managements);
    let managers = []
    for(let i=0; i<managements.length; i++){
        let managerId = managements[i].managerId;
        let manager =  await axios.post("http://localhost:8080/api/employees/get", {
            id: managerId
        }, {withCredentials: true});
        managers.push(manager.data.employee);
    }

    for(let i=0; i<managers.length; i++){
        await axios.post("http://localhost:5005/api/notification/sendNotification", {
            receiver: managers[i].email,
            subject: "New Approval Request",
            message: "You have new pending approval request!"
        }, {withCredentials: true});
    }

    return await createApprovalRequestDataAccess(approvalRequest);
});

exports.deleteApprovalRequestService = asyncHandler(async (approvalRequestId) => {
    return await deleteApprovalRequestDataAccess(approvalRequestId);
});

exports.getAllApprovalRequestsService = asyncHandler(async () => {
    return await getAllApprovalRequestsDataAccess();
});

exports.getApprovalRequestService = asyncHandler(async (approvalRequestId) => {
    return await getApprovalRequestDataAccess(approvalRequestId);
});

exports.getApprovalRequestsWithEmployeeService = asyncHandler(async (employeeId) => {
    return await getApprovalRequestsWithEmployeeDataAccess(employeeId);
});

exports.getApprovalRequestsWithManagerService = asyncHandler(async (managerId) => {
    let managements = await getManagementWithManagerDataAccess(managerId);
    let employeeIds = [];
    managements.forEach(management => {
        employeeIds.push(management.employeeId);
    });

    return await getApprovalRequestsWithEmployeesDataAccess(employeeIds);
});

exports.updateApprovalRequestService = asyncHandler(async (approvalRequestId, managerId, decision) => {
    const request = await getApprovalRequestDataAccess(approvalRequestId);
    if (request.status !== status.PENDING) {
        return {error: "Decision already given"};
    }

    if (!await getManagementDataAccess(request.employeeId, managerId)) {
        return {error: "Manager has not right make a decision"};
    }

    let subject = "Your request is approved!";
    let message = "Your enrollment request is approved by your manager!"
    if(decision === status.DENIED){
        let subject = "Your request is denied!";
        let message = "Your enrollment request is denied by your manager!"
    }
    console.log("geldi");
    console.log(request);
    let employee = await axios.post("http://localhost:8080/api/employees/get", {
        id: request.employeeId
    }, {withCredentials: true});

    console.log(employee);
    employee = employee.data.employee;

    await axios.post("http://localhost:5005/api/notification/sendNotification", {
        receiver: employee.email,
        subject: subject,
        message: message
    }, {withCredentials: true});

    if (decision === status.APPROVED) {
        await createEnrollmentDataAccess({courseId: request.courseId, employeeId: request.employeeId});
    }

    return await updateApprovalRequestDataAccess(approvalRequestId, managerId, decision);
});