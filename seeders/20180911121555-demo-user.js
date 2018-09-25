module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'John',
          login: 'Doe',
          password: 'demo@demo.com',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()')
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
