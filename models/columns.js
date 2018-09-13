module.exports = (sequelize, DataTypes) => {
  const Columns = sequelize.define(
    "Columns",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Columns.associate = db => {
    Columns.hasMany(db.Tasks);
    Columns.belongsTo(db.Boards);
  };
  return Columns;
};
