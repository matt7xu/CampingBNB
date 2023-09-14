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
      review: "Had a great family getaway weekend at Carrie’s location! The little extras were very thoughtful and appreciated. Will definitely be back :)",
      stars: 5,
    },
    {
      userId: 1,
      spotId: 2,
      review: "We really enjoyed our stay, beautiful surrounding, everything we would need was there",
      stars: 4,
    },
    {
      userId: 2,
      spotId: 3,
      review: "We had a really nice time. Peaceful quiet and the perfect date night.",
      stars: 3,
    },
    {
      userId: 3,
      spotId: 4,
      review: "Great spot!",
      stars: 1,
    },
    {
      userId: 1,
      spotId: 5,
      review: "The perfect place to unwind. A nice getaway from the city without driving too far. ",
      stars: 3,
    },
    {
      userId: 3,
      spotId: 7,
      review: "ents were great and was nice to have everything already set up and ready. ",
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
