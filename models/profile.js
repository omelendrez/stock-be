'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  profile.associate = function(models) {
    // associations can be defined here
  };
  return profile;
};