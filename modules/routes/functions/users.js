const Users = require('../../models/Users');

const buildUserArray = (users) => {
  const userArray = [];
  users.forEach((u) => {
    const {
      chatUserUuid,
      chatUserUser,
    } = u;
    userArray.push({
      uuid: chatUserUuid,
      user: chatUserUser,
    });
  });
  return userArray;
};
const error = (res, err) => res
  .status(500)
  .json({ msg: 'Ha ocurrido un error en la base de datos.', err });

async function getUsers(req, res) {
  try {
    const users = await Users.findAll();
    const userArray = buildUserArray(users);
    return res.json(userArray);
  } catch (err) {
    return error(res, err);
  }
}

async function getUserByID(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      msg: 'No se ha proveído ningún id.',
      eg: {
        url: '/users/your-id',
      },
    });
  }
  try {
    const user = await Users.findOne({ where: { chatUserUuid: id } });
    if (!user) {
      return res.status(404).json({ msg: 'El usuario no existe.', id });
    }
    const { chatUserUuid, chatUserUser } = user;
    return res.json({ id: chatUserUuid, user: chatUserUser });
  } catch (err) {
    return error(res, err);
  }
}

async function createUser(req, res) {
  const { user } = req.body;
  if (!user) {
    return res.status(400).json({
      msg: 'No se ha proveído ningún usuario.',
      eg: {
        user: 'John Doe',
      },
    });
  }
  try {
    const userCreated = await Users.create(
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
}

async function updateUser(req, res) {
  const { id, newUser } = req.body;
  if (!id || !newUser) {
    return res.status(400).json({
      msg: 'Incluye el nuevo usuario y el id del usuario actual.',
      eg: {
        id: 'user-id',
        newUser: 'new John Doe',
      },
    });
  }
  try {
    const user = await Users.findOne({ where: { chatUserUuid: id } });
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado.', id });
    }
    Users.update({ chatUserUser: newUser }, { where: { chatUserUuid: id } });
    return res.json({
      msg: 'Usuario actualizado exitosamente.',
      id,
      newUser,
    });
  } catch (err) {
    return error(res, err);
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      msg: 'Incluya el id del usuario.',
      eg: {
        id: 'user-id',
      },
    });
  }
  try {
    const user = await Users.findOne({ where: { chatUserUuid: id } });
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado.', id });
    }
    Users.destroy({ where: { chatUserUuid: id } });
    return res.json({ msg: 'Usuario eliminado exitosamente.', id });
  } catch (err) {
    return error(res, err);
  }
}

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
