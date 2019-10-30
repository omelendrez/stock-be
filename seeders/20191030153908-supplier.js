'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('suppliers', [{
      code: 'V-001',
      name: 'El Bagual',
      phoneNumber: '154737118',
      address: '',
      contact: 'Oscar',
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'V-002',
      name: 'Ultra Tech',
      phoneNumber: '4812211',
      address: 'Necochea 636',
      contact: 'Leonardo Mayo',
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'V-003',
      name: 'Distribuidora Dorrego',
      phoneNumber: '154142467',
      address: '',
      contact: 'Americo',
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'V-004',
      name: 'Royal Canin',
      phoneNumber: '2914738145',
      address: '',
      contact: 'Facundo',
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('suppliers', null, {});
  }
};
