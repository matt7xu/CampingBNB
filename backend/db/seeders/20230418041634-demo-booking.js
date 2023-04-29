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
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      startDate: new Date("2021-11-19"),
      endDate: new Date("2021-11-20"),
    },
    {
      spotId: 1,
      userId: 1,
      startDate: new Date("2021-11-29"),
      endDate: new Date("2021-11-30"),
    },
    {
      spotId: 3,
      userId: 3,
      startDate: new Date("2021-11-19"),
      endDate: new Date("2021-11-20"),
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
