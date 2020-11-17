const userAPI = require('./api/users');
const messageAPI = require('./api/messages');

/** @module router */

/**
 * Contains all the {@link external:"express.Router"|express.Router} from this API.
 *
 * @see {@link module:userAPI|userAPI}
 * @see {@link module:messageAPI|messageAPI}
 * @type {Object}
 */
module.exports = {
  userAPI,
  messageAPI,
};
