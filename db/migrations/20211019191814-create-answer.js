'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Answers",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING(50),
        },
        answer: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        answerScore: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        questionId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          unique: "oneAnswer",
          references: {
            model: "Questions",
            key: "id",
          },
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          unique: "oneAnswer",
          references: {
            model: "Users",
            key: "id",
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("now"),
        },
      },
      {
        // sets up for seeding that we won't have more than one answer per question per user
        uniqueKeys: {
          oneAnswer: {
            fields: ["questionId", "userId"],
          },
        },
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Answers');
  },
};
