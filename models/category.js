'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Código es un campo obligatorio' }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Nombre de categoría es un campo obligatorio' }
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