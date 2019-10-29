'use strict';
module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {});
  store.associate = function(models) {
    // associations can be defined here
  };
  return store;
};