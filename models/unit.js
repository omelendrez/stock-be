'use strict';
module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('unit', {
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
        notEmpty: { msg: 'Nombre de unidad de medida es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de unidad de medida ya existe en la base de datos'
      }
    },
    companyId: DataTypes.INTEGER
  }, {});
  Unit.associate = function (models) {
    // associations can be defined here
  };
  Unit.prototype.data = function () {
    let json = this.toJSON()
    return json
  }
  return Unit;
};