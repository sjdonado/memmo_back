module.exports = (sequelize, DataTypes) => {
  const Interaction = sequelize.define(
    'Interaction',
    {
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      date: DataTypes.DATE,
    },
    {}
  );
  Interaction.associate = (models) => {
    Interaction.belongsTo(models.User, {
      as: 'owner',
      foreignKey: {
        name: 'OwnerId',
        allowNull: false,
      },
    });
    Interaction.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        name: 'UserId',
        allowNull: false,
      },
    });
  };
  return Interaction;
};
