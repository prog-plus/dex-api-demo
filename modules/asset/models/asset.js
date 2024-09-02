import { Sequelize, DataTypes } from 'sequelize';

import sequelize from '../../../db/index.js';

export default sequelize.define(
  'asset',
  {
    asset_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contract_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
