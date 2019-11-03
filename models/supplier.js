'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('supplier', {
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
        notEmpty: { msg: 'Nombre de proveedor es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de proveedor ya existe en la base de datos'
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        args: 'uniqueKey',
        msg: 'Teléfono ya existe en la base de datos.'
      },
      validate: {
        len: { args: [7, 13], msg: 'Número de teléfono debe tener entre 7 y 13 dígitos' },
        isNumeric: { msg: 'Número de teléfono no es válido.' }
      }
    },
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    statusId: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  }, {});
  Supplier.associate = function (models) {
    // associations can be defined here
  };
  Supplier.prototype.data = function () {
    let json = this.toJSON()
    return json
  }
  return Supplier;
};