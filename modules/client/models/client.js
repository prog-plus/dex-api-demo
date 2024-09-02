import { Sequelize, DataTypes } from 'sequelize';

import sequelize from '../../../db/index.js';

export default sequelize.define(
  'client',
  {
    client_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    balance_sol: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      get() {
        return parseFloat(this.getDataValue('balance_sol'));
      },
    },

    balance_tokens: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
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
