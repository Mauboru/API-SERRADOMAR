module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('registration_requests', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      requested_role: {
        type: Sequelize.ENUM('guest', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
      requested_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      approved_by: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'users',  // Tabela referenciada
          key: 'id',
        },
      },
      approved_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('registration_requests');
  },
};
