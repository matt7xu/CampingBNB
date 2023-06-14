'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spotimages';
    return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: "https://i.imgur.com/rrlHXYa.jpeg",
      preview: true
    },
    {
      spotId: 2,
      url: "https://i.imgur.com/z0QlkHR.jpeg",
      preview: true
    },
    {
      spotId: 3,
      url: "https://i.imgur.com/oBCDd0Z.jpeg",
      preview: true
    },
    {
      spotId: 1,
      url: "https://i.imgur.com/rrAPt2v.jpeg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://i.imgur.com/onAxK6W.jpeg",
      preview: true
    },
    {
      spotId: 5,
      url: "https://i.imgur.com/jFoufpl.jpeg",
      preview: true
    },
    {
      spotId: 6,
      url: "https://i.imgur.com/ZJ6Iot4.jpeg",
      preview: true
    },
    {
      spotId: 7,
      url: "https://i.imgur.com/noYHC7C.jpeg",
      preview: true
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spotimages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
