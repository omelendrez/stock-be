'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('store', {
    code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Código es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'El código ingresado ya existe en la base de datos'
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Nombre de depósito es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de depósito ya existe en la base de datos'
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