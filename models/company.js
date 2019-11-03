'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('company', {
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
        notEmpty: { msg: 'Nombre de empresa es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de empresa ya existe en la base de datos'
      }
    }, statusId: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  }, {});
  Company.associate = function (models) {
    // associations can be defined here
  };
  Company.prototype.data = function () {
    let json = this.toJSON()
    return json
  }
  return Company;
};