'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
    },
    {}
  );
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Question, { foreignKey: 'categoryId' });
  };
  return Category;
};
