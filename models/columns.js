module.exports = (sequelize, DataTypes) => {
  const Columns = sequelize.define(
    "Columns",
    {
      name: DataTypes.STRING,
      boards_id: DataTypes.INTEGER
    },
    {}
  );
  Columns.associate = db => {
    Columns.hasMany(db.Tasks, { foreignKey: "columns_id" });
    Columns.belongsTo(db.Boards, { foreignKey: "boards_id" });
  };
  return Columns;
};
