'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
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
        notEmpty: { msg: 'Nombre de perfil es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de perfil ya existe en la base de datos'
      }
    },
  }, {});
  Profile.associate = function (models) {
    // associations can be defined here
  };
  Profile.prototype.data = function () {
    let json = this.toJSON()
    return json
  }
  return Profile;
};