const { DataTypes } = require('sequelize');
const databaseConfig = require('../config/databse');

/** @module userModel */

/**
 * A new model, representing a table in the database. Each key of the object
 * represents a column.
 *
 * @see {@link external:DataTypes|DataTypes}
 * @see {@link module:databaseConfig|databaseConfig}
 * @type {Object}
 */
module.exports = databaseConfig.define('chat_user', {
  chatUserUuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chatUserUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
