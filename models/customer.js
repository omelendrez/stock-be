'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
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
        notEmpty: { msg: 'Nombre de cliente es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de cliente ya existe en la base de datos'
      }
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING,
    vat: DataTypes.DECIMAL,
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.TINYINT
  }, {});
  Customer.associate = function (models) {
    // associations can be defined here
  };
  Customer.prototype.data = function () {
    let json = this.toJSON()
    return json
  }
  return Customer;
};