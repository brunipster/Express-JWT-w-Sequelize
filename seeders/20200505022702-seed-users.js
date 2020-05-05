'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@mail.com',
      phone: '9119119',
      password: '$2b$10$7urnDfOLMvFr9qV6JU6pv.3KpISeWpSn3CP7QSY1FrgvRuPgAXnUe', // pass
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('Users', null, {});
  }
};
