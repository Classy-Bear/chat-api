const { Sequelize } = require('sequelize');

/** @module databaseConfig */

/**
 * Database URI
 * @private
 * @type {string}
 */
const database = process.env.DATABASE_URL;
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
 * An object with options. Contains all the Sequelize options that the
 * Sequelize instance need.
 * @private
 * @type {Object}
 */
/**
 * Character set of the database.
 *
 * This let's @{link external:Sequelize:Sequelize} handle emojis.
 * @type {String}
 * @private
 */
const charset = 'utf8mb4';

const options = {
  define: {
    timestamps,
    underscored,
    freezeTableName,
    charset,
  },
};

/**
 * Exports a {@link external:Sequelize|Sequelize} instance.
 */
module.exports = new Sequelize(database, options);
