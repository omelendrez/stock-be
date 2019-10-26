'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userName: "Omar",
      password: "master1*",
      email: "omar.melendrez@gmail.com",
      profileId: 1,
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userName: "Emanuel",
      password: "ema2019",
      email: "emanuel@gmail.com",
      profileId: 1,
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userName: "Matias",
      password: "mati2019",
      email: "matias@gmail.com",
      profileId: 1,
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
