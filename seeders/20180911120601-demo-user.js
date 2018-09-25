module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'Jo',
          login: 'Di',
          password: 'de@de.com',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()')
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
