const express = require('express');
const {
  getMessages,
  getMessageByID,
  getMessagesFromSender,
  getMessagesFromSenderToReceiver,
  createMessage,
  deleteMessage,
} = require('../functions/messages');

const router = express.Router();
router.get('/', getMessages);
router.get('/:id', getMessageByID);
router.get('/senderToReceiver/:sender&:receiver', getMessagesFromSenderToReceiver);
router.get('/sender/:sender/receiver/:receiver', getMessagesFromSenderToReceiver);
router.get('/sender/:id', getMessagesFromSender);
router.post('/', createMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
