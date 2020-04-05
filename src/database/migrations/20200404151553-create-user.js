const {
  ACCOUNT_STATUSES,
  USER_ROLES,
  DNI_TYPES,
} = require('../../utils/enums');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: USER_ROLES,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ACCOUNT_STATUSES,
      },
      phone: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      dniType: {
        type: Sequelize.ENUM,
        values: DNI_TYPES,
      },
      dni: {
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
