const DataTypes = require('sequelize/lib/data-types');
const db = require('../config/databse');

const Users = db.define('chat_user', {
  chatUserUuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chatUserUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Users;
