'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('profiles', [{
      code: 'ADM',
      name: 'Administrator',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'SUP',
      name: 'Supervisor',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'STK',
      name: 'Storekeeper',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'SAL',
      name: 'Sales representative',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'R_O',
      name: 'Read only',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
