const {
  ACCOUNT_STATUSES,
  USER_ROLES,
  DNI_TYPES,
} = require('../../utils/enums');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      role: {
        allowNull: false,
        type: DataTypes.ENUM(...USER_ROLES),
        defaultValue: USER_ROLES[1],
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(...ACCOUNT_STATUSES),
        defaultValue: ACCOUNT_STATUSES[0],
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      dniType: {
        type: DataTypes.ENUM(...DNI_TYPES),
      },
      dni: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {}
  );
  User.associate = () => {
    // User.hasMany(models.User, {
    //   as: 'interactions',
    //   foreignKey: 'UserId',
    //   onDelete: 'CASCADE',
    //   hooks: true,
    // });
  };
  return User;
};
