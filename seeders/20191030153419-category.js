'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      code: '01',
      name: 'Antibioticos',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '02',
      name: 'Antiparasitarios',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '03',
      name: 'Vacunas',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '04',
      name: 'Shampoo',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '05',
      name: 'Balanceados',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '06',
      name: 'Pomada',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '07',
      name: 'Gotas',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '08',
      name: 'Hormonal',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '09',
      name: 'Suplemento',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '10',
      name: 'Tranquilizante',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '11',
      name: 'Antiinflamatorios',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: '12',
      name: 'Varios',
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
