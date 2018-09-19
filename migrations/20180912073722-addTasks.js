module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: Sequelize.STRING,
      content: Sequelize.STRING,
      status: Sequelize.STRING,
      position: Sequelize.INTEGER,
      columns_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Columns",
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
    }),
  down: queryInterface => queryInterface.dropTable("Tasks")
};
