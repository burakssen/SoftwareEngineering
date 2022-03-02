'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class management extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            management.belongsTo(models.employee, {as: "employee", foreignKey:"employeeId"});
        }
    }
    management.init({
        managerId: DataTypes.INTEGER,
        employeeId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'management',
    });
    return management;
};