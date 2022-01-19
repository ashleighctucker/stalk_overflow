'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      emailAddress: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Question, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
    User.hasMany(models.Answer, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
    User.hasMany(models.Vote, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true,
    });
  };
  return User;
};
