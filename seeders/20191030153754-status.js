'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('statuses', [{
      code: 'AC',
      name: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      code: 'IN',
      name: 'Inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
