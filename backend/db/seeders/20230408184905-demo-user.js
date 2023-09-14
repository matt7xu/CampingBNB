'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'Rubeus@user.io',
        username: 'Rubeus',
        hashedPassword: bcrypt.hashSync('password'),
        firstName:'Rubeus',
        lastName:'Hagrid'
      },
      {
        email: 'Hermione@user.io',
        username: 'Hermione',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName:'Hermione',
        lastName:'Granger'
      },
      {
        email: 'Ron@user.io',
        username: 'Ron',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName:'Ron',
        lastName:'Weasley'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Rubeus', 'Hermione', 'Ron'] }
    }, {});
  }
};
