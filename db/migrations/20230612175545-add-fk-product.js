'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      {
        // table name is pluralised name
        tableName: 'variants',
      },
      {
        fields: ['product_id'],
        type: 'FOREIGN KEY',
        references: {
          table: {
            // table name is pluralised name
            tableName: 'products',
          },
          field: 'id'
        },
        
        name: 'FK_products_variants', // useful if using queryInterface.removeConstraint
        onDelete: 'SET NULL',
        onUpdate: 'cascade'
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      {
        tableName: 'variants',
        schema: database.schema
      },
      'FK_products_variants',
      { transaction }
    );
  }
};
