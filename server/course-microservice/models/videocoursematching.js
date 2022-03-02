'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class videoCourseMatching extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      videoCourseMatching.belongsTo(models.course, { as:'course', foreignKey: "courseId",  onDelete:"cascade", onUpdate: "cascade"});
    }
  };
  videoCourseMatching.init({
    order: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'videoCourseMatching',
    tableName: 'videoCourseMatching',
    timestamps: false
  });
  return videoCourseMatching;
};