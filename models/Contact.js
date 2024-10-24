const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Contact = sequelize.define('contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timezone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Contact;
