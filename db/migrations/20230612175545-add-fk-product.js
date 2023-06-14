'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      {
        
        tableName: 'variants',
      },
      {
        fields: ['product_id'],
        type: 'FOREIGN KEY',
        references: {
          table: {
            
            tableName: 'products',
          },
          field: 'id'
        },
        
        name: 'FK_products_variants', 
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
