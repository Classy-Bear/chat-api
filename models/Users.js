const DataTypes = require('sequelize/lib/data-types');
const db = require('../config/databse');

const Users = db.define('user', {
    users_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true    
    },
    users_user: {
        type: DataTypes.STRING,
        allowNull: false  
    },
});

module.exports = Users;