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
    options.tableName = 'Reviewimages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        spotId: 1,
        url: 'https://imgur.com/IXqwOJR'
      },
      {
        reviewId: 1,
        spotId: 1,
        url: 'https://imgur.com/i8yl1cP'
      },
      {
        reviewId: 3,
        spotId: 3,
        url: 'https://imgur.com/zzlYwDr'
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
    options.tableName = 'Reviewimages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
