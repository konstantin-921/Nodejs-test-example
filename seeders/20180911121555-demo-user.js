module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          login: "Doe",
          password: "demo@demo.com",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {})
};
