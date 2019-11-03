'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
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
        notEmpty: { msg: 'Nombre de categoría es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de categoría ya existe en la base de datos'
      }
    },
    companyId: DataTypes.INTEGER
  }, {});
  Category.associate = function (models) {
    // associations can be defined here
  };
  Category.prototype.data = function () {
    let json = this.toJSON()
    return json
  }

  return Category;
};