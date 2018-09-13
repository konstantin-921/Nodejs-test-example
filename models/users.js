module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      }
    },
    {}
  );
  Users.associate = db => {
    Users.hasMany(db.Boards);
  };
  return Users;
};
