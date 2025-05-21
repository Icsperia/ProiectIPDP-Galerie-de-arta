module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Art', {
        id_art: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        art_name: DataTypes.STRING,
        art_description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        art_images: DataTypes.TEXT,
        categorie: DataTypes.STRING,
    }, {
        tableName: 'arts',
        timestamps: false,
    });
};
