import models from "./index";

module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define(
    "Boards",
    {
      title: {
        type: DataTypes.STRING
      },
      users_id: {
        type: DataTypes.INTEGER
      },
      share: {
        type: DataTypes.BOOLEAN
      }
    },
    {}
  );
  Boards.associate = db => {
    Boards.belongsTo(db.Users, { foreignKey: "users_id" });
    Boards.hasMany(db.Columns, { foreignKey: "boards_id" });
    Boards.belongsToMany(db.Users, {
      through: db.Shares,
      foreignKey: "boards_id",
      as: "Share"
    });
  };
  return Boards;
};
