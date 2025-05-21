const { DataTypes } = require('sequelize');
const sequelize = require('../DatabaseConnection');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    registered: DataTypes.DATE,
    last_login: DataTypes.DATE
}, {
    tableName: 'users', // Asigură-te că tabela se numește așa
    timestamps: false
});

module.exports = User;
