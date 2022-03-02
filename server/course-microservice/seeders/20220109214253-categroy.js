
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        'category',
        [
          {
              name: "deneme"
          },
          {
              name: "Oooooo"
          },
          {
              name: "dffgdfg"
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
      return queryInterface.bulkDelete('category', null, {cascade: true, truncate: true, restartIdentity: true })
  }
};