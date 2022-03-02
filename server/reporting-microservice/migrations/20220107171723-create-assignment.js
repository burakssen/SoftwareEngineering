'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assignment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deadline: {
        type: Sequelize.DATE
      },
      assignmentDate: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.STRING
      },
      enrollmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      managementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assignment');
  }
};