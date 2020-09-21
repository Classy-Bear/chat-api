const Sequelize = require('sequelize');
module.exports = new Sequelize('postgres://david@localhost:5432/postgres', {
    define: {
        timestamps: false
    }
});