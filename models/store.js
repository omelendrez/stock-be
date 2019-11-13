'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('store', {
    code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Código es un campo obligatorio' }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Nombre de depósito es un campo obligatorio' }
      }
    },
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.TINYINT
  }, {});
  Store.associate = function (models) {
    // associations can be defined here
  };
  Store.prototype.data = function () {
    let json = this.toJSON()
    return json
  }
  return Store;
};