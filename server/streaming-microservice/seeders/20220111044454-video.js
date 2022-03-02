'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
        'video',
        [
          {
            title: "test-vide2o",
            description: "test-description",
            duration: 1000,
            videoPath: "test-video-path",
            coverPhoto: "test-co3ver-photo"
          },
          {
            title: "test-video5",
            description: "test-description",
            duration: 1000,
            videoPath: "test-video-path1",
            coverPhoto: "test-c3over-photo"
          },
          {
            title: "test-v4ideo",
            description: "test-description",
            duration: 1000,
            videoPath: "test-video-path3",
            coverPhoto: "test-c5over-photo"
          },
            {
                title: "test-v4igfdeo",
                description: "test-description",
                duration: 1000,
                videoPath: "test-fgfgvideo-path3",
                coverPhoto: "test-cfggf5over-photo"
            },
            {
                title: "teregst-f",
                description: "test-description",
                duration: 1000,
                videoPath: "test-vqegideo-path3",
                coverPhoto: "testerqg-c5over-photo"
            },
            {
                title: "test-vqerg4ideo",
                description: "test-description",
                duration: 1000,
                videoPath: "testqerg-video-path3",
                coverPhoto: "testqergqe-c5over-photo"
            },
        ],
        {
            autoIncrement: true
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('video', null, {});
  }
};
