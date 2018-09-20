import models from './index';

module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define(
    'Boards',
    {
      title: {
        type: DataTypes.STRING
      },
      owner: {
        type: DataTypes.INTEGER
      },
      owned: {
        type: DataTypes.BOOLEAN
      }
    },
    {}
  );
  Boards.associate = db => {
    Boards.belongsTo(db.Users, { foreignKey: 'owner' });
    Boards.hasMany(db.Columns, {
      foreignKey: 'boards_id'
      // onDelete: 'cascade',
      // hooks: true
    });
    Boards.belongsToMany(db.Users, {
      through: db.Shares,
      foreignKey: 'boards_id',
      as: 'share'
    });
  };
  return Boards;
};
