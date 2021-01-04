const chalk = require('chalk');
const messageModel = require('../../models/Messages');
const userModel = require('../../models/Users');
const databseConfig = require('../../config/databse');

/** @module messageFunctions */

/**
 * Formats a message.
 *
 * @param {Array} messages - The returned messages from the database.
 * @return {Array} The same Array formatted.
 * @private
 */
const buildMessage = async (message) => {
  // Fetch receiver and sender
  const sender = await databseConfig.query(
    `SELECT * FROM chat_user WHERE chat_user_uuid::text = '${message.chatMessageSender}' LIMIT 1`, {
      model: userModel,
      mapToModel: true,
    },
  );
  const receiver = await databseConfig.query(
    `SELECT * FROM chat_user WHERE chat_user_uuid::text = '${message.chatMessageReceiver}' LIMIT 1`, {
      model: userModel,
      mapToModel: true,
    },
  );
  return {
    id: message.chatMessageUuid,
    text: message.chatMessageMessage,
    sender: {
      sender_id: sender[0].dataValues.chatUserUuid,
      sender_name: sender[0].dataValues.chatUserUser,
    },
    receiver: {
      receiver_id: receiver[0].dataValues.chatUserUuid,
      receiver_name: receiver[0].dataValues.chatUserUser,
    },
    sendDate: message.chatMessageSendDate,
    dateOffset: message.chatMessageDateOffset,
  };
};

/**
 * Formats an Array of message.
 *
 * @param {Array} messages - The returned messages from the database.
 * @return {Array} The same Array formatted.
 * @private
 */
const buildMessageArray = async (messages) => {
  const messageArray = [];
  await Promise.all(messages.map(async (m) => {
    const row = m.dataValues;
    const message = await buildMessage(row);
    messageArray.push(message);
  }));
  return messageArray;
};

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
 * Get all the messages from the database.
 *
 * @async
 * @function getMessages
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or an Array of
 * messages (if success).
 */
const getMessages = async (req, res) => {
  try {
    const messages = await messageModel.findAll({
      order: [['chatMessageSendDate', 'ASC']],
    });
    const messageArray = await buildMessageArray(messages);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Get a message by id from the database.
 *
 * @async
 * @function getMessageByID
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with a messages
 * (if success).
 */
const getMessageByID = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await databseConfig.query(
      `SELECT * FROM chat_message WHERE chat_message_uuid::text = '${id}' LIMIT 1`, {
        model: messageModel,
        mapToModel: true,
      },
    );
    if (message.length === 0) {
      return res.status(404).json({ msg: 'El mensaje no existe.', id });
    }
    const data = message[0].dataValues;
    return res.json(await buildMessage(data));
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Get all the messages from a sender to a receiver.
 *
 * @async
 * @function getMessagesFromSenderToReceiver
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with an Array of
 * messages (if success).
 */
const getMessagesFromSenderToReceiver = async (req, res) => {
  const { sender, receiver } = req.params;
  if (!sender || !receiver) {
    return res.status(400).json({
      msg: 'Incluya los id en la url.',
      sender,
      receiver,
    });
  }
  try {
    const messages = await messageModel.findAll({
      where: { chatMessageSender: sender, chatMessageReceiver: receiver },
      order: [['chatMessageSendDate', 'ASC']],
    });
    if (messages.length === 0) {
      return res.status(404).json({
        msg: 'Este usuario no ha enviado mensajes a este receptor.',
      });
    }
    const messageArray = await buildMessageArray(messages);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Get all the messages from a sender without specifying the receiver.
 *
 * @async
 * @function getMessagesFromSender
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with an Array of
 * messages (if success).
 */
const getMessagesFromSender = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await messageModel.findAll({
      where: { chatMessageSender: id },
      order: [['chatMessageSendDate', 'ASC']],
    });
    if (messages.length === 0) {
      return res.status(404).json({
        msg:
          'Este usuario no ha enviado mensajes.',
      });
    }
    const messageArray = await buildMessageArray(messages);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Creates a message from a sender to a receiver.
 *
 * @async
 * @function createMessage
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with the
 * created message (if success).
 */
const createMessage = async (req, res) => {
  const {
    message, sender, receiver, sendDate, dateOffset,
  } = req.body;
  if (!message || !sender || !receiver || !sendDate || !dateOffset) {
    return res.status(400).json({
      msg: 'No se han proporcionaron todos los campos.',
      message,
      sender,
      receiver,
      sendDate,
      dateOffset,
    });
  }
  try {
    const query = await messageModel.create(
      {
        chatMessageMessage: message,
        chatMessageSender: sender,
        chatMessageReceiver: receiver,
        chatMessageSendDate: sendDate,
        chatMessageDateOffset: dateOffset,
      },
      { returning: true, plain: true },
    );
    const messageCreated = await buildMessage(query);
    messageCreated.msg = 'Creado con éxito';
    return res.status(201).json(messageCreated);
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Deletes a message with the specified ID.
 *
 * @async
 * @function deleteMessage
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @return {Object} A JSON Object with an error (if failure) or with the
 * message ID (if success).
 */
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await databseConfig.query(
      `SELECT * FROM chat_message WHERE chat_message_uuid::text = '${id}' LIMIT 1`, {
        model: messageModel,
        mapToModel: true,
      },
    );
    if (message.length === 0) {
      return res.status(404).json({ msg: 'El mensaje no existe.', id });
    }
    await messageModel.destroy({ where: { chatMessageUuid: id } });
    return res.json({ msg: 'Mensaje eliminado exitosamente.', id });
  } catch (err) {
    return error(res, err);
  }
};

/**
 * Contains a object with all this methods.
 * @see {@link module:messageModel|messageModel}
 * @type {Object}
 */
module.exports = {
  getMessages,
  getMessageByID,
  getMessagesFromSenderToReceiver,
  getMessagesFromSender,
  createMessage,
  deleteMessage,
};
