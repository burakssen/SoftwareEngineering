'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  progress.init({
    watchedTime: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'progress',
    tableName: 'progress',
    timestamps: false
  });
  return progress;
};