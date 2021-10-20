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
        emailAddress: 'ash@greenthumb.com',
        hashedPassword: password,
      },
      {
        fullName: 'Patrick Wellman',
        userName: 'patrickwellman',
        emailAddress: 'patrick@greenthumb.com',
        hashedPassword: password,
      },
      {
        fullName: 'Sarah Yang',
        userName: 'sarahyang',
        emailAddress: 'sarah@greenthumb.com',
        hashedPassword: password,
      },
      {
        fullName: 'Jane Green',
        userName: 'demo',
        emailAddress: 'demo@greenthumb.com',
        hashedPassword: password,
      },
    ];

    const usersNum = 50;

    for (let i = 4; i < usersNum; i++) {
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let nextUser = {
        fullName: firstName.concat(' ', lastName),
        userName: faker.internet.userName(),
        emailAddress: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(`PlantLover!${i}`, 12),
      };
      users.push(nextUser);
    }
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
