'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{
      code: 'P-0001',
      name: 'Floxacin Enrofloxacina 5% AFFORD',
      categoryId: 1,
      minimum: 0,
      lastPurchaseDate: '2017-06-15',
      lastPurchasePrice: 125.68,
      lastSaleDate: '2019-05-01',
      lastSalePrice: 215.5,
      price: 215.5,
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'P-0002',
      name: 'Cefalexina 500 mg PyoDerm Plus',
      categoryId: 1,
      minimum: 10,
      lastPurchaseDate: '2017-06-15',
      lastPurchasePrice: 80,
      lastSaleDate: '2019-05-01',
      lastSalePrice: 120,
      price: 120,
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
