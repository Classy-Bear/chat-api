const Messages = require('../../models/Messages');

const buildMessageArray = (messages) => {
  const messageArray = [];
  messages.forEach((m) => {
    const {
      chatMessageUuid,
      chatMessageMessage,
      chatMessageSender,
      chatMessageReceiver,
      chatMessageSendDate,
    } = m;
    messageArray.push({
      uuid: chatMessageUuid,
      message: chatMessageMessage,
      sender: chatMessageSender,
      receiver: chatMessageReceiver,
      sendDate: chatMessageSendDate,
    });
  });
  return messageArray;
};
const error = (res, err) => res
  .status(500)
  .json({ msg: 'Ha ocurrido un error en la base de datos.', err });

async function getMessages(req, res) {
  try {
    const messages = await Messages.findAll({
      order: [['chatMessageSendDate', 'ASC']],
    });
    const messageArray = buildMessageArray(messages);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
}

async function getMessageByID(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      msg: 'No se ha proveído ningún id.',
      eg: {
        url: '/messages/your-id',
      },
    });
  }
  try {
    const messages = await Messages.findOne({
      where: { chatMessageUuid: id },
    });
    if (messages.length === 0) {
      return res.status(404).json({ msg: 'El mensaje no existe.', id });
    }
    const {
      chatMessageUuid,
      chatMessageMessage,
      chatMessageSender,
      chatMessageReceiver,
      chatMessageSendDate,
    } = messages;
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

async function getMessagesFromSenderToReceiver(req, res) {
  const { sender, receiver } = req.params;
  if (!sender || !receiver) {
    return res.status(400).json({
      msg: 'Incluya los id en la url.',
      eg: {
        url: '/messages/:sender_uuid&:receiver_uuid',
      },
    });
  }
  try {
    const messages = await Messages.findAll({
      where: { chatMessageSender: sender, chatMessageReceiver: receiver },
      order: [['chatMessageSendDate', 'ASC']],
    });
    if (messages.length === 0) {
      return res.status(404).json({
        msg:
          'Este usuario no ha enviado mensajes o han sido reconocidos por el <sender>.',
        err: messages,
      });
    }
    const messageArray = buildMessageArray(messages.dataValues);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
}

async function getMessagesFromSender(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      msg:
        'Incluya el id en la url.',
      eg: {
        url: '/messages/sender/:id',
      },
    });
  }
  try {
    const messages = await Messages.findAll({
      where: { id },
      order: [['chatMessageSendDate', 'ASC']],
    });
    if (messages.length === 0) {
      return res.status(404).json({
        msg:
          'Este usuario no ha enviado mensajes o han sido reconocidos por el <sender>.',
        err: messages,
      });
    }
    const messageArray = buildMessageArray(messages.dataValues);
    return res.json(messageArray);
  } catch (err) {
    return error(res, err);
  }
}

async function createMessage(req, res) {
  const { message, sender, receiver } = req.body;
  if (!message || !sender || !receiver) {
    return res.status(400).json({
      msg: 'No se han proporcionaron todos los campos.',
      eg: {
        message: 'El mensaje que los usuarios quieren enviar.',
        sender: 'El id del sender.',
        receiver: 'El id del receiver.',
      },
    });
  }
  try {
    const query = await Messages.create(
      {
        chatMessageMessage: message,
        chatMessageSender: sender,
        chatMessageReceiver: receiver,
      },
      { returning: true, plain: true },
    );
    const {
      chatMessageUuid,
      chatMessageMessage,
      chatMessageSender,
      chatMessageReceiver,
      chatMessageSendDate,
    } = query;
    return res.status(201).json({
      msg: 'Creado con éxito.',
      id: chatMessageUuid,
      message: chatMessageMessage,
      sender: chatMessageSender,
      receiver: chatMessageReceiver,
      date: chatMessageSendDate,
    });
  } catch (err) {
    return error(res, err);
  }
}

async function deleteMessage(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      msg: 'Incluya el id del mensaje a eliminar.',
      eg: {
        id: 'El message-uuid.',
      },
    });
  }
  try {
    await Messages.destroy({ where: { chatMessageUuid: id } });
    return res.json({ msg: 'Mensajes eliminados exitosamente.' });
  } catch (err) {
    return error(res, err);
  }
}

module.exports = {
  getMessages,
  getMessageByID,
  getMessagesFromSenderToReceiver,
  getMessagesFromSender,
  createMessage,
  deleteMessage,
};
