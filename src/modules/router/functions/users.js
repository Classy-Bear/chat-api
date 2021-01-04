const chalk = require('chalk');
const userModel = require('../../models/Users');
const databseConfig = require('../../config/databse');

/** @module userFunctions */

/**
 * Returns an Internal Server Error (500) with the given err.
 *
 * @param {Object} res - Express response object.
 * @param {Object} err - Error catched.
 * @return {Object} A JSON formatted with the err given.
 * @private
 */
const error = (res, err) => {
  console.log(chalk.red('Error'));
  console.log(chalk.bgRed(err));
  res
    .status(500)
    .json({ msg: 'Ha ocurrido un error en la base de datos.', err });
};

/**
 * Get all the users from the database.
 *
 * @async
 * @function getUsers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or an Array of
 * users (if success).
 */
const getUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    const userArray = [];
    users.forEach((user) => {
      userArray.push({
        id: user.chatUserUuid,
        user: user.chatUserUser,
      });
    });
    return res.json(userArray);
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Get an user by ID from the database.
 *
 * @async
 * @function getUserByID
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with the user
 * (if success).
 */
const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await databseConfig.query(
      `SELECT * FROM chat_user WHERE chat_user_uuid::text = '${id}' LIMIT 1`, {
        model: userModel,
        mapToModel: true,
      },
    );
    if (user.length === 0) {
      return res.status(404).json({ msg: 'El usuario no existe.', id });
    }
    const { chatUserUuid, chatUserUser } = user[0].dataValues;
    return res.json({ id: chatUserUuid, user: chatUserUser });
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Creates an user and insert it into the database.
 *
 * @async
 * @function createUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with the
 * created user (if success).
 */
const createUser = async (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.status(400).json({
      msg: 'No se ha proveído ningún usuario.',
      user,
    });
  }
  try {
    const userCreated = await userModel.create(
      { chatUserUser: user },
      { returning: true, plain: true },
    );
    const { chatUserUuid, chatUserUser } = userCreated;
    return res.status(201).json({
      msg: 'Creado exitosamente.',
      id: chatUserUuid,
      user: chatUserUser,
    });
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Updates an user from the database.
 *
 * @async
 * @function updateUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with the
 * created user (if success).
 */
const updateUser = async (req, res) => {
  const { id, newUser } = req.body;
  if (!id || !newUser) {
    return res.status(400).json({
      msg: 'Incluye el nuevo usuario y el id del usuario actual.',
      id,
      newUser,
    });
  }
  try {
    const user = await databseConfig.query(
      `SELECT * FROM chat_user WHERE chat_user_uuid::text = '${id}' LIMIT 1`, {
        model: userModel,
        mapToModel: true,
      },
    );
    if (user.length === 0) {
      return res.status(404).json({ msg: 'El usuario no existe.', id });
    }
    userModel.update({ chatUserUser: newUser }, { where: { chatUserUuid: id } });
    return res.json({
      msg: 'Usuario actualizado exitosamente.',
      id,
      newUser,
    });
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Deletes an user from the database.
 *
 * @async
 * @function deleteUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with the
 * deleted user id (if success).
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await databseConfig.query(
      `SELECT * FROM chat_user WHERE chat_user_uuid::text = '${id}' LIMIT 1`, {
        model: userModel,
        mapToModel: true,
      },
    );
    if (user.length === 0) {
      return res.status(404).json({ msg: 'El usuario no existe.', id });
    }
    userModel.destroy({ where: { chatUserUuid: id } });
    return res.json({ msg: 'Usuario eliminado exitosamente.', id });
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Contains a object with all this methods.
 *
 * @see {@link module:userModel|userModel}
 * @type {Object}
 */
module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
