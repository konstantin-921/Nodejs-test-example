module.exports = {
  up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      name: Sequelize.STRING,
      login: Sequelize.STRING,
      password: Sequelize.STRING
    });
  },

  down(queryInterface) {
    // logic for reverting the changes
    queryInterface.dropTable("Users");
  }
};
