module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define(
    "Tasks",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.STRING,
      position: DataTypes.INTEGER,
      columns_id: DataTypes.INTEGER
    },
    {}
  );
  Tasks.associate = db => {
    Tasks.belongsTo(db.Columns, { foreignKey: "columns_id" });
  };
  return Tasks;
};
