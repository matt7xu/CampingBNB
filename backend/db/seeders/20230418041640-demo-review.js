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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
    {
      userId: 1,
      spotId: 1,
      review: "This was an awesome spot!",
      stars: 5,
    },
    {
      userId: 1,
      spotId: 2,
      review: "This was an so so spot!",
      stars: 4,
    },
    {
      userId: 2,
      spotId: 3,
      review: "This was not an awesome spot!",
      stars: 2,
    },
    {
      userId: 3,
      spotId: 4,
      review: "This was not an awesome spot!",
      stars: 1,
    },
    {
      userId: 1,
      spotId: 5,
      review: "This was not an awesome spot!",
      stars: 3,
    },
    {
      userId: 2,
      spotId: 6,
      review: "This was not an awesome spot!",
      stars: 1,
    },
    {
      userId: 3,
      spotId: 7,
      review: "This was not an awesome spot!",
      stars: 2,
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
