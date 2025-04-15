module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('access_logs', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',  // Tabela referenciada
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      ip_address: {
        type: Sequelize.STRING(45),  // Para IPv6
        allowNull: true,
      },
      user_agent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      access_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      success: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('access_logs');
  },
};
