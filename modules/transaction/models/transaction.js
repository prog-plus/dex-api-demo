import { Sequelize, DataTypes } from 'sequelize';

import sequelize from '../../../db/index.js';
import Asset from '../../asset/models/asset.js';
import Client from '../../client/models/client.js';
import POSITION_TYPE_ENUM from '../../dex/enums/positionType.js';
import TRANSACTION_STATUS_ENUM from '../enums/transactionStatus.js';
import TRANSACTION_TYPE_ENUM from '../enums/transactionType.js';

export default sequelize.define(
  'transaction',
  {
    transaction_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Client,
        key: 'client_id',
      },
    },

    asset_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Asset,
        key: 'asset_id',
      },
    },

    transaction_type: {
      type: DataTypes.ENUM(
        TRANSACTION_TYPE_ENUM.open_position,
        TRANSACTION_TYPE_ENUM.close_position
      ),
      allowNull: false,
    },

    position_type: {
      type: DataTypes.ENUM(
        POSITION_TYPE_ENUM.long,
        POSITION_TYPE_ENUM.short
      ),
      allowNull: false,
    },

    amount_token: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('amount_token'));
      },
    },

    amount_sol: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        return parseFloat(this.getDataValue('amount_sol'));
      },
    },

    status: {
      type: DataTypes.ENUM(
        TRANSACTION_STATUS_ENUM.pending,
        TRANSACTION_STATUS_ENUM.successful,
        TRANSACTION_STATUS_ENUM.failed
      ),
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    dex_transaction_id: DataTypes.STRING,

    platform_balance_before: {
      type: DataTypes.DECIMAL,
      get() {
        return parseFloat(this.getDataValue('platform_balance_before'));
      },
    },

    platform_balance_after: {
      type: DataTypes.DECIMAL,
      get() {
        return parseFloat(this.getDataValue('platform_balance_after'));
      },
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
