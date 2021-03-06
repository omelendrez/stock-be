'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('supplier', {
    code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Código es un campo obligatorio' }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Nombre de proveedor es un campo obligatorio' }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: { args: [7, 13], msg: 'Número de teléfono debe tener entre 7 y 13 dígitos' },
        isNumeric: { msg: 'Número de teléfono no es válido.' }
      }
    },
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.TINYINT
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