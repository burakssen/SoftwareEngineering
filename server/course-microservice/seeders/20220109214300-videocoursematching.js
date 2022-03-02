'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        'videoCourseMatching',
        [
          {
            order: 1,
            courseId: 1,
            videoId: 2
          },
          {
            order: 1,
            courseId: 1,
            videoId: 1
          },

          {
            order: 1,
            courseId: 2,
            videoId: 1
          },
          {
            order: 1,
            courseId: 2,
            videoId: 2
          },
            {
                order: 1,
                courseId: 2,
                videoId: 3
            }
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
    return queryInterface.bulkDelete('videoCourseMatching', null, {cascade:true, truncate:true, restartIdentity: true })
  }
};
