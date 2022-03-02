const { approvalRequest, employee } = require("../models");
const { status } = require("../common/constants/endpoints/approvalRequest")

exports.createApprovalRequestDataAccess = async (_approvalRequest) => {
    return approvalRequest.create({
        ..._approvalRequest,
        requestTime: Date.now(),
        status: status.PENDING,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });
}

exports.getApprovalRequestDataAccess = async (approvalRequestId) => {
    return approvalRequest.findOne({where: {id: approvalRequestId}});
}

exports.deleteApprovalRequestDataAccess = async (approvalRequestId) => {
    return approvalRequest.destroy({where: {id: approvalRequestId}});
}

exports.getAllApprovalRequestsDataAccess = async () => {
    return approvalRequest.findAll({
            include: [
                {
                    model: employee,
                    required: false,
                    as: 'employee'
                },
                {
                    model: employee,
                    required: false,
                    as: 'manager'
                }
            ]
        }
    );
}

exports.updateApprovalRequestDataAccess = async (approvalRequestId, managerId, decision) => {
    return approvalRequest.update({
        approvedManagerId: managerId, status: decision, decisionTime: Date.now()
    }, {
        where: {id: approvalRequestId}});
}

exports.getApprovalRequestsWithEmployeeDataAccess = async (employeeId) => {
    return approvalRequest.findAll(
        {where: {employeeId},
            include: [
                {
                    model: employee,
                    required: false,
                    as: 'employee'
                },
                {
                    model: employee,
                    required: false,
                    as: 'manager'
                }
            ]
        });
}

exports.getApprovalRequestsWithEmployeeAndCourseDataAccess = async (employeeId, courseId) => {
    return approvalRequest.findAll({where: {employeeId, courseId}});
}

exports.getApprovalRequestsWithEmployeesDataAccess = async (employees) => {
    return approvalRequest.findAll(
        {
            where: {employeeId: employees},
            include: [
                {
                    model: employee,
                    required: false,
                    as: 'employee'
                },
                {
                    model: employee,
                    required: false,
                    as: 'manager'
                }
            ]
        }
    );
}

