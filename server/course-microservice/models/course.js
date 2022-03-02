'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      course.belongsTo(models.category, { as:'category', foreignKey: "categoryId",  onDelete:"cascade", onUpdate: "cascade"});
      course.hasMany(models.videoCourseMatching, {as: 'videos', foreignKey: "courseId", onDelete:"cascade", onUpdate: "cascade"})
    }
  }
  course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    coverPhotoPath: DataTypes.STRING,
    duration: DataTypes.STRING,
    isLive: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course',
    tableName: 'course',
    timestamps: false
  });
  return course;
};