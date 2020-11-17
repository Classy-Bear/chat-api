const { Router } = require('express');
const userFunctions = require('../functions/users');

/** @module userAPI */

/**
 * Exports an {@link external:"express.Router"|express.Router} with the HTTP
 * methods the {@link module:userModel|userModel} can have.
 *
 * @see {@link module:userFunctions|userFunctions}
 * @see {@link external:"express.Router"|express.Router}
 * @type {Object}
 */
module.exports = Router()
  .get('/', userFunctions.getUsers)
  .get('/:id', userFunctions.getUserByID)
  .post('/', userFunctions.createUser)
  .put('/', userFunctions.updateUser)
  .delete('/:id', userFunctions.deleteUser);
