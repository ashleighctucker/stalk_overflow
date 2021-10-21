'use strict';

const answers = require("../../answers");
const { User } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    

      return queryInterface.bulkInsert('Answer', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Answer', null, {});
  }
};
