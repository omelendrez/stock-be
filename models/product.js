'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
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
        notEmpty: { msg: 'Nombre de producto es un campo obligatorio' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de producto ya existe en la base de datos'
      }
    },
    categoryId: DataTypes.INTEGER,
    minimum: DataTypes.INTEGER,
    lastPurchaseDate: DataTypes.DATE,
    lastPurchasePrice: DataTypes.DECIMAL,
    lastSaleDate: DataTypes.DATE,
    lastSalePrice: DataTypes.DECIMAL,
    unitId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.TINYINT
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
  };
  Product.prototype.data = function () {
    let json = this.toJSON()
    return json
  }
  return Product;
};