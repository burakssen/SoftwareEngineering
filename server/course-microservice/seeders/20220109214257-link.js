'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        'link',
        [
          {
            platform: "Zoom",
            meetingLink: "kdfnldfkgjşdfg",
            meetingTime: new Date(),
            capacity: 1000,
            courseId: 2
          },
          {
            platform: "Zofgdfgom",
            meetingLink: "kdfnldfkgjşdfg",
            meetingTime: new Date(),
            capacity: 1000,
            courseId: 1
          },
          {
            platform: "ŞKGŞFKG",
            meetingLink: "kdfnldfkgjşdfg",
            meetingTime: new Date(),
            capacity: 1000,
            courseId: 2
          },
            {
                platform: "ŞKGŞFKfgdfghG",
                meetingLink: "kdfdfghdfnldfkgjşdfg",
                meetingTime: new Date(),
                capacity: 1000,
                courseId: 1
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
    return queryInterface.bulkDelete('link', null, {cascade:true, truncate:true, restartIdentity: true })
  }
};
