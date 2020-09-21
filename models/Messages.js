const DataTypes = require('sequelize/lib/data-types');
const db = require('../config/databse');

const Messages = db.define('message', {
    messages_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true    
    },
    messages_message: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    messages_sender: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    messages_receiver: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    messages_send_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false  
    }
});

module.exports = Messages;