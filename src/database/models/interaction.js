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
      as: 'firstUser',
      foreignKey: {
        name: 'firstUserId',
        allowNull: false,
      },
    });
    Interaction.belongsTo(models.User, {
      as: 'secondUser',
      foreignKey: {
        name: 'secondUserId',
        allowNull: false,
      },
    });
  };
  return Interaction;
};
