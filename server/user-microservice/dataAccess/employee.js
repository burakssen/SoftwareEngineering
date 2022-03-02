const {employee} = require("../models");

exports.createEmployeeDataAccess = async (_employee) => {
    return employee.create({..._employee, createdAt: Date.now(), updatedAt: Date.now()});
}

exports.getEmployeeDataAccess = async (employeeId) => {
    return employee.findOne({where: {id: employeeId}});
}

exports.getAllEmployeesDataAccess = async () => {
    return employee.findAll({});
}

exports.getEmployeesWithEmployeeRoleDataAccess = async () => {
    return employee.findAll({
        where: {
            isManager: false
        }
    });
}

exports.deleteEmployeeDataAccess = async (employeeId) => {
    return await employee.destroy({where: {id: employeeId}});
}

exports.updateEmployeeDataAccess = async (_employee) => {
    return employee.update({..._employee, updatedAt: Date.now()}, {where: {id: _employee.id}});
}

exports.getEmployeeWithUsernameDataAccess = async (username) => {
    return employee.findOne({where: {username: username}});
}

