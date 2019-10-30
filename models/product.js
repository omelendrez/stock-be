'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    minimum: DataTypes.INTEGER,
    lastPurchaseDate: DataTypes.DATE,
    lastPurchasePrice: DataTypes.DECIMAL,
    lastSaleDate: DataTypes.DATE,
    lastSalePrice: DataTypes.DECIMAL,
    price: DataTypes.DECIMAL,
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {});
  product.associate = function (models) {
    // associations can be defined here
  };
  return product;
};