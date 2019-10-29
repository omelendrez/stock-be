'use strict';
module.exports = (sequelize, DataTypes) => {
  const unit = sequelize.define('unit', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {});
  unit.associate = function(models) {
    // associations can be defined here
  };
  return unit;
};