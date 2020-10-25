const Sequelize = require('sequelize');

let user = 'postgres';
let db = 'postgres';
const host = 'localhost';
const args = process.argv.slice(2);
const [firstArg, secondArg] = args;
if (firstArg) user = firstArg;
if (secondArg) db = secondArg;

module.exports = new Sequelize(
  `postgres://${user}@${host}:5432/${db}`,
  {
    define: {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
    },
  },
);
