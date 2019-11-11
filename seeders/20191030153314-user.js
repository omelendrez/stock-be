'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      userName: "omar",
      fullName: "Omar Melendrez",
      password: "$2b$10$/mVqA0JTbgYdnpVBVRRjHeRtUssjQP9blC62RvmVHnIBErP4AGHmG",
      email: "omar.melendrez@gmail.com",
      profileId: 1,
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userName: "ema",
      fullName: "Emanuel Valaco",
      password: "$2b$10$yauQGkielQowp6QFYQ8cL.6BGFe/7PLFZ/o6GWZR8YCJdEcMjhw5e",
      email: "emarengo73@gmail.com",
      profileId: 1,
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userName: "mati",
      password: "$2b$10$yPv9V6moZvlRHfzP6JqlHuDdnHKzcvZjoyiKyC0KjehOgRd8HqbaK",
      fullName: "Matias Mancinelli",
      email: "matias41071034@gmail.com",
      profileId: 1,
      companyId: 1,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
