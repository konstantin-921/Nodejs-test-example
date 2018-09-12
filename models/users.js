module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      name: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  Users.associate = db => {
    Users.hasMany(db.Boards);
  };
  return Users;
};
