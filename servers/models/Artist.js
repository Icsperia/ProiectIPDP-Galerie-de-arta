// models/Artist.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Artist', {
        id_artist: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        bio: DataTypes.STRING,
        image: DataTypes.STRING
    }, {
        tableName: 'artists', // ✅ corect: plural, fără conflict cu 'art'
        timestamps: false
    });
};
