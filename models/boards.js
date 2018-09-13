module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define(
    "Boards",
    {
      title: {
        type: DataTypes.STRING
      },
      share: {
        type: DataTypes.BOOLEAN
      }
    },
    {}
  );
  Boards.associate = db => {
    Boards.hasMany(db.Columns);
    Boards.belongsTo(db.Users);
  };
  return Boards;
};
