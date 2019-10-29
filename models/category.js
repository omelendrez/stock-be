'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};