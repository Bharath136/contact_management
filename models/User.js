const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.STRING(6), // To store a 6-digit OTP
        allowNull: true, // Allow null initially
    },
    otpExpiration: {
        type: DataTypes.DATE, // To store the expiration time of the OTP
        allowNull: true, // Allow null initially
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
}, {
    // Add timestamps if you want createdAt and updatedAt fields automatically
    timestamps: true,
    // Optionally, you can use paranoid to automatically manage deletedAt
    paranoid: true,
});

module.exports = User;
