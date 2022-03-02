'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      link.belongsTo(models.course, { as:'course', foreignKey: "courseId",  onDelete:"cascade", onUpdate: "cascade"});
    }
  };
  link.init({
    platform: DataTypes.STRING,
    meetingLink: DataTypes.STRING,
    meetingTime: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'link',
    tableName: 'link',
    timestamps: false
  });
  return link;
};