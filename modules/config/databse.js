const Sequelize = require('sequelize');

module.exports = new Sequelize(
  process.env.DATABASE_URL,
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
