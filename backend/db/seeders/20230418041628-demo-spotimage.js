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
      url: "image url id1",
      preview: true
    },
    {
      spotId: 1,
      url: "image url id2",
      preview: false
    },
    {
      spotId: 3,
      url: "image url id3",
      preview: true
    },
    {
      spotId: 1,
      url: "image url id4",
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
