const express = require('express');
const {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
} = require('../functions/users');

const router = express.Router();
router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
