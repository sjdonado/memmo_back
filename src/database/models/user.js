module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dni: DataTypes.STRING,
  }, {});
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
