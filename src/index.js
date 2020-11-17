const express = require('express');
const cors = require('cors');
const databaseConfig = require('./modules/config/databse');
const { userAPI, messageAPI } = require('./modules/router/router');

/**
 * @file index.js is the root file for this ChatApp REST API.
 * @author Classy Bear
 * @see <a href="https://github.com/Classy-Bear">Github profile</a>
 * @see {@link external:express|express}
 * @see {@link external:cors|cors}
 * @see {@link module:databaseConfig|databaseConfig}
 * @see {@link module:router|router}
 */

(async () => {
  try {
    await databaseConfig.authenticate();
  } catch {
    return;
  }
  const port = process.env.PORT || 5000;
  express()
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .get('/', (req, res) => res.json({ authKey: 'incorrect' }))
    .use('/users', userAPI)
    .use('/messages', messageAPI)
    .listen(port);
})();

/**
 * This is the main class, the entry point to sequelize.
 *
 * @external Sequelize
 * @see {@link https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html}
 */

/**
 * A convenience class holding commonly used data types.
 *
 * @external DataTypes
 * @see {@link https://sequelize.org/master/variable/index.html#static-variable-DataTypes}
 */

/**
 * Creates a new router object.
 *
 * @external "express.Router"
 * @see {@link https://expressjs.com/en/4x/api.html#express.router}
 */

/**
 * Creates an Express application.
 *
 * @external express
 * @see {@link https://expressjs.com/en/4x/api.html#express}
 */

/**
 * Enables {@link https://en.wikipedia.org/wiki/Cross-origin_resource_sharing|CORS} with various options.
 *
 * @external cors
 * @see {@link https://github.com/expressjs/cors#readme}
 */
