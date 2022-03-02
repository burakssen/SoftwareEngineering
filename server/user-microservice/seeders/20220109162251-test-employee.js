'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
        'employee',
        [
          {
            name: "Zuafir",
            surname: "Demir",
            username: "zuafir",
            password: "zuafirzuafir",
            email: "zuafir@gmaill.com",
            positionName: "employee",
            isManager: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "bdfgd",
            surname: "şen",
            username: "burakssen",
            email: "buraksen7@hotmail.com",
            password: "denemegthgf",
            positionName: "manager",
            isManager: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "basar",
            surname: "şen",
            username: "afddfg",
            email: "adgf@hotmail.com",
            password: "denemdfhgdfe",
            positionName: "employee",
            isManager: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {
          autoIncrement: true,
          cascade: true,
          truncate: true,
          restartIdentity: true
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('employee', null, {cascade: true, truncate: true, restartIdentity: true });
  }
};
