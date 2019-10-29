'use strict';
module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define('company', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    statusId: DataTypes.INTEGER
  }, {});
  company.associate = function(models) {
    // associations can be defined here
  };
  return company;
};