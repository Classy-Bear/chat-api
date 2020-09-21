const express = require('express');

// Create an express router.
const router = express.Router();

// Database Model
const Messages = require('../../models/Messages');

// Get all messages sorted by date it was sended (ASC).
router.get('/', async (req, res) => {
    try {
        const messages = await Messages.findAll({
            order: [
                ['messages_send_date', 'ASC'],
            ],
        });
        if (!messages) {
            return res.status(500).json({ msg: `Usuarios retorno un valor falso.`, err: messages });
        } else {
            const messageArray = [];
            for (const message of messages) {
                messageArray.push({
                    uuid: message['dataValues']['messages_uuid'],
                    message: message['dataValues']['messages_message'],
                    sender: message['dataValues']['messages_sender'],
                    receiver: message['dataValues']['messages_receiver'],
                    send_date: message['dataValues']['messages_send_date']
                });
            }
            return res.json(messageArray);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Ha pasado un error en la base de datos.', err });
    }
});

// Get all messages who have send an user to a particular user (ASC).
router.get('/sender_receiver/:sender_uuid&:receiver_uuid', async (req, res) => {
    const sender = req.params['sender_uuid'];
    const receiver = req.params['receiver_uuid'];

    if (!sender || !receiver) {
        return res.status(400).json({
            msg: 'Incluya los UUID en la URL para retornar todos los mensajes enviados por el usuario.',
            eg: {
                url: 'http://your-url/messages/:sender_uuid&:receiver_uuid'
            },
        });
    }

    try {
        const messages = await Messages.findAll({
            where: { messages_sender: sender , messages_receiver: receiver }, 
            order: [
                ['messages_send_date', 'ASC'],
            ],
        });
        if (!messages) {
            res.status(404).json({ msg: 'Este usuario no ha enviado mensajes o han sido reconocidos por el <sender>.', err : messages });
        } else {
            const messageArray = [];
            for (const message of messages) {
                messageArray.push({
                    uuid: message['dataValues']['messages_uuid'],
                    message: message['dataValues']['messages_message'],
                    sender: message['dataValues']['messages_sender'],
                    receiver: message['dataValues']['messages_receiver'],
                    send_date: message['dataValues']['messages_send_date']
                });
            }
            return res.json(messageArray);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Ha ocurrido un error en la base de datos.', err });
    }
});

// Get all messages who have send an user (ASC).
router.get('/sender/:sender_uuid', async (req, res) => {
    const sender = req.params['sender_uuid'];

    if (!sender) {
        return res.status(400).json({
            msg: 'Incluya el UUID en la URL para retornar todos los mensajes enviados por el usuario.',
            eg: {
                url: 'http://your-url/messages/sender/:sender_uuid'
            },
        });
    }

    try {
        const messages = await Messages.findAll({
            where: { messages_sender: sender }, 
            order: [
                ['messages_send_date', 'ASC'],
            ],
        });
        if (!messages) {
            res.status(404).json({ msg: 'Este usuario no ha enviado mensajes o han sido reconocidos por el <sender>.', err : messages });
        } else {
            const messageArray = [];
            for (const message of messages) {
                messageArray.push({
                    uuid: message['dataValues']['messages_uuid'],
                    message: message['dataValues']['messages_message'],
                    sender: message['dataValues']['messages_sender'],
                    receiver: message['dataValues']['messages_receiver'],
                    send_date: message['dataValues']['messages_send_date']
                });
            }
            return res.json(messageArray);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Ha ocurrido un error en la base de datos.', err });
    }
});

// Get message by uuid
router.get('/getMessage/:uuid', async (req, res) => {
    const uuid = req.params['uuid'];

    if (!uuid) {
        return res.status(400).json({
            msg: 'Incluya el UUID en la URL para retornar todos el mensaje enviado por el usuario.',
            eg: {
                url: 'http://your-url/messages/:uuid'
            },
        });
    }
    try {
        const message = await Messages.findOne({
            where: { messages_uuid: uuid },
        });
        if (!message) {
            return res.status(404).json({ msg: 'Este usuario no ha enviado mensajes o han sido reconocidos por el <sender>.', err : messages });
        } else {
            return res.json({
                uuid: message['messages_uuid'],
                message: message['messages_message'],
                sender: message['messages_sender'],
                receiver: message['messages_receiver'],
                send_date: message['messages_send_date']
            });
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Ha ocurrido un error en la base de datos.', err });
    }
});

// Create a new message
router.post('/', async (req, res) => {
    const messages_message = req.body['message'];
    const messages_sender = req.body['sender'];
    const messages_receiver = req.body['receiver'];

    if (!messages_message || !messages_sender || ! messages_receiver) {
        return res.status(400).json({
            msg: 'Make sure you have the following fields: <message>, <sender>, <receiver>.',
            eg: {
                message: "Hey",
                sender: "sender uuid",
                receiver: "receiver uuid",
            },
        });
    }

    try {
        const message = await Messages.create({ messages_message, messages_sender, messages_receiver } , {returning: true, plain: true});
        return res.status(201).json({ 
            msg: 'Creado con éxito.',
            uuid: message['messages_uuid'],
            message: messages_message, 
            sender: messages_sender, 
            receiver: messages_receiver
        });
    } catch (err) {
        return res.status(500).json({ msg: 'Ha pasado un error en la base de datos.', err });
    }
});

// Delete a message.
router.delete('/:uuid', async (req, res) => {
    const uuid = req.params['uuid'];

    if (!uuid) {
        return res.status(400).json({
            msg: 'Incluya el mensaje a eliminar.',
            eg: {
                uuid: "message uuid.",
            },
        });
    }

    try {
        await Messages.destroy({ where: { messages_uuid: uuid } });
        return res.json({ msg: 'Mensajes eliminados exitosamente.'});
    } catch (err) {
        return res.status(500).json({ msg: 'Ha pasado un error en la base de datos.', err });
    }
});

module.exports = router;