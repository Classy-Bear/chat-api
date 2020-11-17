const messageModel = require('../../models/Messages');
const databseConfig = require('../../config/databse');

/** @module messageFunctions */

/**
 * Formats an Array of message for the API consumer.
 *
 * @param {Array} messages - The returned messages from the database.
 * @return {Array} The same Array formatted.
 * @private
 */
const buildMessageArray = (messages) => {
  const messageArray = [];
  messages.forEach((m) => {
    const row = m.dataValues;
    messageArray.push({
      uuid: row.chatMessageUuid,
      message: row.chatMessageMessage,
      sender: row.chatMessageSender,
      receiver: row.chatMessageReceiver,
      sendDate: row.chatMessageSendDate,
    });
  });
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
const error = (res, err) => res
  .status(500)
  .json({ msg: 'Ha ocurrido un error en la base de datos.', err });

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
async function getMessages(req, res) {
  try {
    const messages = await messageModel.findAll({
      order: [['chatMessageSendDate', 'ASC']],
    });
    const messageArray = buildMessageArray(messages);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
}

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
async function getMessageByID(req, res) {
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
    const {
      chatMessageUuid,
      chatMessageMessage,
      chatMessageSender,
      chatMessageReceiver,
      chatMessageSendDate,
    } = message[0].dataValues;
    return res.json({
      id: chatMessageUuid,
      message: chatMessageMessage,
      sender: chatMessageSender,
      receiver: chatMessageReceiver,
      sendDate: chatMessageSendDate,
    });
  } catch (err) {
    return error(res, err);
  }
}

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
async function getMessagesFromSenderToReceiver(req, res) {
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
    const messageArray = buildMessageArray(messages);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
}

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
async function getMessagesFromSender(req, res) {
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
    const messageArray = buildMessageArray(messages);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
}

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
async function createMessage(req, res) {
  const { message, sender, receiver } = req.body;
  if (!message || !sender || !receiver) {
    return res.status(400).json({
      msg: 'No se han proporcionaron todos los campos.',
      message,
      sender,
      receiver,
    });
  }
  try {
    const query = await messageModel.create(
      {
        chatMessageMessage: message,
        chatMessageSender: sender,
        chatMessageReceiver: receiver,
      },
      { returning: true, plain: true },
    );
    return res.status(201).json({
      msg: 'Creado con éxito.',
      id: query.chatMessageUuid,
      message: query.chatMessageMessage,
      sender: query.chatMessageSender,
      receiver: query.chatMessageReceiver,
      date: query.chatMessageSendDate,
    });
  } catch (err) {
    return error(res, err);
  }
}

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
async function deleteMessage(req, res) {
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
}

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
