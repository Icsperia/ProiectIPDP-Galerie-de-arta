module.exports = (sequelize, DataTypes) => {

    return sequelize.define('Order', {
        id_user: DataTypes.INTEGER,
        id_art: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        judet: DataTypes.STRING,
        oras: DataTypes.STRING,
        strada: DataTypes.STRING,
        tele: DataTypes.STRING
    }, {
        modelName: 'Order',          // ✅ ensures it's available as sequelize.models.Order
        tableName: 'orders',
        timestamps: false
    });
};
