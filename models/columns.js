module.exports = (sequelize, DataTypes) => {
  const Columns = sequelize.define(
    "Columns",
    {
      name: DataTypes.STRING,
      boards_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Boards",
          key: "id"
        }
      }
    },
    {}
  );
  Columns.associate = db => {
    Columns.hasMany(db.Tasks);
    Columns.belongsTo(db.Boards);
  };
  return Columns;
};
