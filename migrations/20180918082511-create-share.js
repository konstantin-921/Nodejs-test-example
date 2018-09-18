module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Shares", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      users_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id"
        }
      },
      boards_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Boards",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Shares");
  }
};
