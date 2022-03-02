
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        'assignment',
        [
          {
            deadline: "2022-01-08",
            assignmentDate: "2022-01-08",
            notes: "dfgdfg",
            enrollmentId: 7,
            managementId: 10
          }
        ],
        {
          autoIncrement: true,
          cascade: true,
          truncate: true,
          restartIdentity: true
        });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('assignment', null, {cascade: true, truncate: true, restartIdentity: true })
  }
};