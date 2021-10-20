'use strict';

const bcrypt = require('bcryptjs');

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    //Password for all of our demo accounts
    const password = bcrypt.hashSync('Dirt21!', 12);

    let users = [
      {
        fullName: 'Ash Tucker',
        userName: 'ashtucker',
        email: 'ash@greenthumb.com',
        hashedPassword: password,
      },
      {
        fullName: 'Patrick Wellman',
        userName: 'patrickwellman',
        email: 'patrick@greenthumb.com',
        hashedPassword: password,
      },
      {
        fullName: 'Sarah Yang',
        userName: 'sarahyang',
        email: 'sarah@greenthumb.com',
        hashedPassword: password,
      },
      {
        fullName: 'Jane Green',
        userName: 'demo',
        email: 'demo@greenthumb.com',
        hashedPassword: password,
      }
    ];

    

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
