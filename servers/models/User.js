module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
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
        tableName: 'users',
        timestamps: false
    });
};
