const {management, employee} = require("../models");

exports.createManagementDataAccess = async (_management) => {
    return management.create({..._management, createdAt: Date.now(), updatedAt: Date.now()});
}

exports.getManagementDataAccess = async (employeeId, managerId) => {
    return management.findOne({where: {employeeId: employeeId, managerId: managerId}});
}

exports.getAllManagementDataAccess = async () => {
    return management.findAll({});
}

exports.deleteManagementDataAccess = async (managementId) => {
    return management.destroy({where: {id: managementId}});
}

exports.getManagementWithManagerDataAccess = async (managerId) => {
    return management.findAll({
        where: {managerId: managerId},
        include: [
            {
                model: employee,
                required: false,
                as: 'employee'
            }
        ]
    });
}

exports.getManagementWithEmployeeDataAccess = async (employeeId) => {
    return management.findAll({where: {employeeId: employeeId}});
}

exports.getManagementWithId = async (managementId) => {
    return management.findOne({where: {id: managementId}});
}


