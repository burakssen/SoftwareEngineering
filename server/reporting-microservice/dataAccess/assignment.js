const {assignment}  = require("../models");
const {SERVER_ERROR} = require("../common/constants/statusCodes");

exports.saveNewAssignmentDataAccess = async (newAssignment, res) => {
    return await assignment.create({
        deadline: newAssignment.deadline,
        assignmentDate: Date.now(),
        notes: newAssignment.notes,
        enrollmentId: newAssignment.enrollmentId,
        managementId: newAssignment.managementId
    });
}

exports.deleteAssignmentDataAccess = async (assignmentId, res) => {
    return await assignment.destroy({
        where: {
            id: assignmentId,
        }
    });
}

exports.getAssignmentDataAccess = async (assignmentId, res) => {
    return await assignment.findOne({
        where: {
            id: assignmentId
        }
    });
}

exports.getAssignmentWithEnrollmentIdDataAccess = async (enrollmentId, res) => {
    return await assignment.findOne({
        where: {
            enrollmentId: enrollmentId
        }
    });
}

exports.getAllAssignmentsDataAccess = async (res) => {
    return await assignment.findAll();
}

exports.updateAssignmentDataAccess = async (updatedAssignment, res) => {
    const updateRes = await assignment.update({
        deadline: updatedAssignment.deadline,
        assignmentDate: updatedAssignment.assignmentDate,
        notes: updatedAssignment.notes,
        enrollmentId: updatedAssignment.enrollmentId,
        managementId: updatedAssignment.managementId
    },  {
        where: {
            id: updatedAssignment.id
        },
        returning: true
    });

    if(updateRes[0] !== 0) {
        return updateRes[1][0].dataValues;
    }
    return null;
}

exports.getAssignmentsWithManagementsDataAccess = async (managementIds, res) => {
    return await assignment.findAll({where: {managementId: managementIds}});
}