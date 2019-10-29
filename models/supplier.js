'use strict';
module.exports = (sequelize, DataTypes) => {
  const supplier = sequelize.define('supplier', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {});
  supplier.associate = function(models) {
    // associations can be defined here
  };
  return supplier;
};