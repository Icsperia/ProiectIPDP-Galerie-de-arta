module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Cart', {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_art: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        tableName: 'cart',
        timestamps: false
    });
};
