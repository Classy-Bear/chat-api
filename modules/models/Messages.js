const DataTypes = require('sequelize/lib/data-types');
const db = require('../config/databse');

const Messages = db.define('chat_message', {
  chatMessageUuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chatMessageMessage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatMessageSender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatMessageReceiver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatMessageSendDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

module.exports = Messages;
