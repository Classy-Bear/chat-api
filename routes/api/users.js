const express = require('express');

// Create an express router.
const router = express.Router();

// Database Model
const Users = require('../../models/Users');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await Users.findAll();
        if (!users) {
            return res.status(500).json({ msg: `Usuarios retorno un valor falso.`, err : users });
        } else {
            const userArray = [];
            for (const user of users) {
                userArray.push({
                    uuid: user['users_uuid'], 
                    user: user['users_user']
                });
            }
            return res.json(userArray);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Ha pasado un error en la base de datos.', err });
    }
});

// Get user by uuid
router.get('/:uuid', async (req, res) => {
    const uuid = req.params['uuid'];

    if (!uuid) {
        return res.status(400).json({
            msg: 'Incluya un uuid en la URL para retornar el usuario que desea encontrar en la base de datos',
            eg: {
                url: "http://your-url/users/your-uuid"
            },
        });
    }

    try {
        const user = await Users.findOne({where: { users_uuid: uuid }});
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado', uuid });
        } else {
            return res.json({uuid: user['users_uuid'], user: user['users_user']});
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Ha ocurrido un error en la base de datos.', err });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const user = req.body['user'];

    if (!user) {
        return res.status(400).json({
            msg: 'Incluya un usuario.',
            eg: {
                user: "David"
            },
        });
    }

    try {
        const userCreated = await Users.create({ users_user: user }, {returning: true, plain: true});
        return res.status(201).json({ msg: 'Created successfully', uuid: userCreated['users_uuid'], user: userCreated['users_user']});
    } catch (err) {
        return res.status(500).json({ msg: 'Ha pasado un error en la base de datos.', err });
    }
});

// Update an user
router.put('/', async (req, res) => {
    const uuid = req.body['uuid'];
    const newUser = req.body['newUser'];

    if (!uuid || !newUser) {
        return res.status(400).json({
            msg: 'Incluya el nuevo usuario y el uuid del usuario que quiera actualizar.',
            eg: {
                uuid: "my-uuid",
                newUser: "David"
            },
        });
    }

    try {
        const user = await Users.findOne({where: { users_uuid: uuid } });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado', uuid });
        } else {
            Users.update({ users_user: newUser }, { where: { users_uuid: uuid } }); 
            return res.json({ msg: 'Usuario actualizado exitosamente.', uuid, newUser});
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Ha pasado un error en la base de datos.', err });
    }
});

// Delete an user
router.delete('/:uuid', async (req, res) => {
    const uuid = req.params['uuid'];

    if (!uuid) {
        return res.status(400).json({
            msg: 'Incluya el uuid del usuario que quiere eliminar.',
            eg: {
                uuid: "2ce597b7-a865-4a7a-aabd-7a2c9b038f2b",
            },
        });
    }

    try {
        const user = await Users.findOne({where: { users_uuid: uuid }});
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado', uuid });
        } else {
            Users.destroy({ where: { users_uuid: uuid }});
            return res.json({ msg: 'Usuario eliminado exitosamente.', uuid });
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Ha pasado un error en la base de datos.', err });
    }
});

module.exports = router;