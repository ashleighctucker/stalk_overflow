'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "Category",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
    },
    {}
  );
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};
