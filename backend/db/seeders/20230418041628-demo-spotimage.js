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
      url: "https://res.cloudinary.com/dmdiqj57t/image/upload/v1694661497/pexels-guduru-ajay-bhargav-939723_de4ns5.jpg",
      preview: true
    },
    {
      spotId: 2,
      url: "https://res.cloudinary.com/dmdiqj57t/image/upload/v1694661494/JLCG_tents_Teewinot_2008_mattson_1_gqpdlz.jpg",
      preview: true
    },
    {
      spotId: 3,
      url: "https://res.cloudinary.com/dmdiqj57t/image/upload/v1694661493/blog_campping_yttepi.jpg",
      preview: true
    },
    {
      spotId: 1,
      url: "https://res.cloudinary.com/dmdiqj57t/image/upload/v1694661493/images_1_w3rbfw.jpg",
      preview: false
    },
    {
      spotId: 4,
      url: "https://res.cloudinary.com/dmdiqj57t/image/upload/v1694661480/FamilyCamping-2021-GettyImages-948512452-2_qfuiyu.webp",
      preview: true
    },
    {
      spotId: 5,
      url: "https://res.cloudinary.com/dmdiqj57t/image/upload/v1694661480/lake-wenatchee-state-park_HERO_CAMPWA0922-09e49c99f7fd4a3b9238bdfd4475928b_wuapkz.jpg",
      preview: true
    },
    {
      spotId: 6,
      url: "https://res.cloudinary.com/dmdiqj57t/image/upload/v1694661479/tent-camping-at-sunset_cezv7n.jpg",
      preview: true
    },
    {
      spotId: 7,
      url: "https://res.cloudinary.com/dmdiqj57t/image/upload/v1694661479/images_lcafmb.jpg",
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
