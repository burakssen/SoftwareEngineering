'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class approvalRequest extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            approvalRequest.belongsTo(models.employee, { as:'employee', foreignKey: "employeeId"});
            approvalRequest.belongsTo(models.employee, { as:'manager', foreignKey: "approvedManagerId"});
        }
    }
    approvalRequest.init({
        courseId: DataTypes.INTEGER,
        employeeId: DataTypes.INTEGER,
        approvedManagerId: DataTypes.INTEGER,
        requestTime: DataTypes.DATE,
        status: DataTypes.INTEGER,
        decisionTime: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'approvalRequest',
        tableName: 'approvalRequest',
    });
    return approvalRequest;
};