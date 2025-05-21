const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('art_galerie', 'marian', '1234', {
    host: 'mysql_db',      // numele containerului MySQL
    dialect: 'mysql',
    port: 3306,
    logging: false,        // sau true pentru debug
});

module.exports = sequelize;
