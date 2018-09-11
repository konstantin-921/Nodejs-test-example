module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      age: DataTypes.STRING
    },
    {}
  );
  Users.associate = function() {};
  return Users;
};
