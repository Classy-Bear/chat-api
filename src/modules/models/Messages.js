const { DataTypes } = require('sequelize');
const databaseConfig = require('../config/databse');

/** @module messageModel */

/**
 * A new model, representing a table in the database. Each key of the object
 * represents a column.
 *
 * @see {@link external:DataTypes|DataTypes}
 * @see {@link module:databaseConfig|databaseConfig}
 * @type {Object}
 */
module.exports = databaseConfig.define('chat_message', {
  chatMessageUuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chatMessageMessage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatMessageSender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatMessageReceiver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatMessageSendDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});
