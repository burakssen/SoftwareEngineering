'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class enrollment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            enrollment.belongsTo(models.employee, { as:'employee', foreignKey: "employeeId"});
        }
    }
    enrollment.init({
        courseId: DataTypes.INTEGER,
        employeeId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'enrollment',
        tableName: 'enrollment',
    });
    return enrollment;
};