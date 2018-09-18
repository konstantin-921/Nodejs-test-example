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
    Boards.hasMany(db.Columns);
    Boards.belongsTo(db.Users);
    Boards.belongsToMany(db.Users, { through: "Shares" });
  };
  return Boards;
};
