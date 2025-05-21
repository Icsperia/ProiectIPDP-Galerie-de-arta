const sequelize = require('../DatabaseConnection');
const { DataTypes } = require('sequelize');

const Art = require('./Art')(sequelize, DataTypes);
const Cart = require('./Cart')(sequelize, DataTypes);
const Artist = require('./Artist')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const User = require('./User'); // Dacă User e definit cu sequelize.define

// Relații
Art.hasMany(Cart, { foreignKey: 'id_art', as: 'cartItems' });
Cart.belongsTo(Art, { foreignKey: 'id_art', as: 'art' });

Artist.hasMany(Art, { foreignKey: 'id_artist', as: 'lucrari' });
Art.belongsTo(Artist, { foreignKey: 'id_artist', as: 'artist' });

module.exports = {
    sequelize,
    Art,
    Cart,
    Artist,
    Order,
    User
};
