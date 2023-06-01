'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 A St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "A Academy",
        description: "Place where web developers are created",
        price: 1123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 1,
        address: "123 B St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645356,
        lng: -122.4730325,
        name: "B Academy",
        description: "Place where web developers are created",
        price: 2123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 3,
        address: "123 C St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "C Academy",
        description: "Place where web developers are created",
        price: 3123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 1,
        address: "123 D St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "D Academy",
        description: "Place where web developers are created",
        price: 4123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 2,
        address: "123 E St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "E Academy",
        description: "Place where web developers are created",
        price: 5123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 3,
        address: "123 F St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "F Academy",
        description: "Place where web developers are created",
        price: 6123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 1,
        address: "123 G St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "G Academy",
        description: "Place where web developers are created",
        price: 7123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["A Academy","B Academy","C Academy","D Academy","E Academy","F Academy","G Academy"] }
    }, {});
  }
};
