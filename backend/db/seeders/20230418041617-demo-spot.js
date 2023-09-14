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
        address: "26 Grove St",
        city: "Half Moon Bay",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "The Loon Tent at Salmonier River Tents",
        description: "Salmonier River Tents offers a comfortable, unique camping experience",
        price: 112,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 1,
        address: "120 Central Ave",
        city: "Half Moon Bay",
        state: "California",
        country: "United States of America",
        lat: 37.7645356,
        lng: -122.4730325,
        name: "Groveland Great Glamping",
        description: "Enjoy the lovely setting of this romantic spot in nature. ",
        price: 212,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 3,
        address: "120 Myrtle St",
        city: "Half Moon Bay",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "The Invisible Home",
        description: "Welcome to our off-grid tiny home near the Grand Canyon, where nature takes center stage!",
        price: 312,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 1,
        address: "120 Poplar St",
        city: "Half Moon Bay",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "Cascade Camp Surrounded by National Forest",
        description: "Experience the beauty of nature at this unforgettable escape. ",
        price: 412,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 2,
        address: "123 Miramontes Ave",
        city: "Half Moon Bay",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "Ocean Breeze - Camping",
        description: "Incorporating the magnificent beauty of the Stinson beach & our cool glamping/cottage nestled at the most sought-after location, we have created a  truly versatile holiday spot. ",
        price: 512,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 3,
        address: "123 Pine Ave",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "Crosley - Private Glamping",
        description: "The Crosley Bell Tent: Your Private Oasis in Northern California",
        price: 123,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36"
      },
      {
        ownerId: 1,
        address: "123 Kelly Ave",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645357,
        lng: -122.4730326,
        name: "Camping fun by the lake",
        description: "Reconnect with nature at this unforgettable escape.",
        price: 713,
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
      name: { [Op.in]: ["The Loon Tent at Salmonier River Tents","Groveland Great Glamping","The Invisible Home","Cascade Camp Surrounded by National Forest","Ocean Breeze - Camping","Crosley - Private Glamping","Camping fun by the lake"] }
    }, {});
  }
};
