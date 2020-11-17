const { Sequelize } = require('sequelize');

/** @module socket_events*/

/**
 * Database URI
 * @example
 * postgres://user:pass@example.com:5432/dbname
 * @private
 * @type {string}
 */
const database = process.env.DATABASE_URL || 'postgres://david@localhost:5432/pruebas';
/**
 * Database timestamps
 *
 * Don't add the timestamp attributes updatedAt, createdAt to the database.
 * Sequelize set timestamps to true by default.
 * @private
 * @type {boolean}
 */
const timestamps = false;
/**
 * Database underscore
 *
 * Don't use camelcase for automatically added attributes instead use snakecase
 * so updatedAt will be updated_at. Most SQL developers use snakecase.
 * @private
 * @type {boolean}
 */
const underscored = true;
/**
 * No plural names
 *
 * Disable the modification of tablenames; By default, sequelize will
 * automatically transform all passed model names (first parameter of define)
 * into plural.
 * @private
 * @type {boolean}
 */
const freezeTableName = true;
/**
 * Sequelize options
 *
 * An object with options.
 * @private
 * @type {Object}
 */
const options = {
  define: {
    timestamps,
    underscored,
    freezeTableName,
  },
};

/**
 * Exports a {@link external:Sequelize|Sequelize} instance
 *
 * @see {@link external:Sequelize|Sequelize}
 */
module.exports = new Sequelize(database, options);
