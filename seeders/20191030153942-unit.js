'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('units', [{
      code: 'BG',
      name: 'Bag',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'BT',
      name: 'Bottle',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'BX',
      name: 'Box',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'EA',
      name: 'Each',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'KG',
      name: 'Kilogram',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'PC',
      name: 'Piece',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'UN',
      name: 'Unit',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'ML',
      name: 'Millilitre',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'BL',
      name: 'Blister',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'CO',
      name: 'Comprimido',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('units', null, {});
  }
};
