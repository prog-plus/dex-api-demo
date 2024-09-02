import { Sequelize, DataTypes } from 'sequelize';

import sequelize from '../../../db/index.js';

export default sequelize.define(
  'platform_balance',
  {
    balance_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    balance_sol: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('balance_sol'));
      },
    },

    balance_tokens: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('balance_tokens'));
      },
    },

    last_updated: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
