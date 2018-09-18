module.exports = (sequelize, DataTypes) => {
  const Shares = sequelize.define(
    "Shares",
    {
      users_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      boards_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
    },
    {}
  );
  Shares.associate = function(models) {
    // associations can be defined here
  };
  return Shares;
};
