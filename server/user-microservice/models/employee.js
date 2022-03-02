'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    employee.init({
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        positionName: DataTypes.STRING,
        isManager: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'employee',
        tableName: 'employee'
    });
    return employee;
};