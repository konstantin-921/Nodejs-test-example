module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define(
    "Tasks",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.STRING,
      position: DataTypes.INTEGER
    },
    {}
  );
  Tasks.associate = db => {
    Tasks.belongsTo(db.Columns);
  };
  return Tasks;
};
