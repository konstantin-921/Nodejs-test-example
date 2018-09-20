module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Users.associate = db => {
    Users.hasMany(db.Boards, { foreignKey: 'owner' });
    Users.belongsToMany(db.Boards, {
      through: db.Shares,
      foreignKey: 'users_id',
      as: 'share'
    });
  };
  return Users;
};
