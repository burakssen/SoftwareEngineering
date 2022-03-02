'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'course',
        [
          {
            name: "Programming with C++ dffgdfg",
            description: "You can learndhgdfhgdfhg C++ by this course",
            coverPhotoPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
            duration: "22:07",
            isLive: false,
            categoryId: 1
          },
          {
            name: "Programming wdfghdfhgith C++",
            description: "You dfhgdfhgcan learn C++ by this course",
            coverPhotoPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
            duration: "22:07",
            isLive: false,
            categoryId: 2
          },
          {
            name: "fdghdfhgdfgh with C++",
            description: "You dghcan learn C++ by this course",
            coverPhotoPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
            duration: "22:07",
            isLive: false,
            categoryId: 1
          },
          {
            name: "Programmidfhgdfhgng with C++",
            description: "You dfghdfghdf learn C++ by this course",
            coverPhotoPath: "dfhttps://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
            duration: "22:07",
            isLive: false,
            categoryId: 1
          },
          {
            name: "Programmigdhdfghdfng with C++",
            description: "You can learnghdfghdfgh C++ by this course",
            coverPhotoPath: "https://upload.widfghdfghdfgkimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
            duration: "22:07",
            isLive: false,
            categoryId: 1
          },
          {
            name: "Programming withhdfghdf C++",
            description: "You can learnghdfghdfgh C++ by this course",
            coverPhotoPath: "dfghdfhgdhttps://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
            duration: "22:07",
            isLive: true,
            categoryId: 2
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
      return queryInterface.bulkDelete('course', null, {cascade:true, truncate:true, restartIdentity: true })
  }
};
