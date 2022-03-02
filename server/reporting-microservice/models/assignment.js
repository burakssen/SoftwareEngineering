'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  assignment.init({
    deadline: DataTypes.DATE,
    assignmentDate: DataTypes.DATE,
    notes: DataTypes.STRING,
    enrollmentId: DataTypes.INTEGER,
    managementId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'assignment',
    tableName: 'assignment',
    timestamps: false
  });
  return assignment;
};