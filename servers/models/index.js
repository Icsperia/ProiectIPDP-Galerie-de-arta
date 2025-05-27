const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../DatabaseConnection');

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Art = require('./Art')(sequelize, DataTypes);
db.Cart = require('./Cart')(sequelize, DataTypes);
db.Artist = require('./Artist')(sequelize, DataTypes);
db.Order = require('./Order')(sequelize, DataTypes);
db.User = require('./User')(sequelize, DataTypes);

// Relații
db.Art.hasMany(db.Cart, { foreignKey: 'id_art', as: 'cartItems' });
db.Cart.belongsTo(db.Art, { foreignKey: 'id_art', as: 'art' });

db.Artist.hasMany(db.Art, { foreignKey: 'id_artist', as: 'lucrari' });
db.Art.belongsTo(db.Artist, { foreignKey: 'id_artist', as: 'artist' });

module.exports = db;
