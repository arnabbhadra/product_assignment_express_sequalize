'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { models: _models } = sequelize;
  class Variant extends Model {
    
    static associate(models) {

    }
  }
  Variant.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sku: {
      allowNull:false,
      defaultValue: 0,
      min: 0,
      type: DataTypes.NUMBER
    },
    additional_cost: {
      allowNull:false,
      defaultValue: 0,
      type: DataTypes.NUMBER
    },
    stock_count: {
      allowNull:false,
      defaultValue: 0,
      min: 0,
      type: DataTypes.NUMBER
    },
    product_id: {
      allowNull:false,
      type: DataTypes.NUMBER
    },
    deleted: {
      allowNull:false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'variant',
    underscored: true,
  });
  return Variant;
};