module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define(
    "Boards",
    {
      name: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
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
