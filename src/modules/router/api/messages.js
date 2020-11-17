const { Router } = require('express');
const messageFunctions = require('../functions/messages');

/** @module messageAPI */

/**
 * Exports an {@link external:"express.Router"|express.Router} with the HTTP
 * methods the {@link module:messageModel|messageModel} can have.
 *
 * @see {@link module:messageFunctions|messageFunctions}
 * @see {@link external:"express.Router"|express.Router}
 * @type {Object}
 */
module.exports = Router()
  .get('/', messageFunctions.getMessages)
  .get('/:id', messageFunctions.getMessageByID)
  .get('/senderToReceiver/:sender&:receiver', messageFunctions.getMessagesFromSenderToReceiver)
  .get('/sender/:sender/receiver/:receiver', messageFunctions.getMessagesFromSenderToReceiver)
  .get('/sender/:id', messageFunctions.getMessagesFromSender)
  .post('/', messageFunctions.createMessage)
  .delete('/:id', messageFunctions.deleteMessage);
