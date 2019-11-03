'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('status', {
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
        notEmpty: { msg: 'Nombre de status es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de status ya existe en la base de datos'
      }
    },
  }, {});
  Status.associate = function (models) {
    // associations can be defined here
  };
  Status.prototype.data = function () {
    let json = this.toJSON()
    return json
  }
  return Status;
};