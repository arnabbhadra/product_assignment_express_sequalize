'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('variants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sku: {
        allowNull:false,
        defaultValue: 0,
        min: 0,
        type: Sequelize.INTEGER
      },
      additional_cost: {
        allowNull:false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      stock_count: {
        allowNull:false,
        defaultValue: 0,
        min: 0,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      deleted: {
        allowNull:false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('variants');
  }
};