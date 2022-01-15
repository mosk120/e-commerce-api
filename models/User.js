const user = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING,
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        });
    // User.sync();
    return User;
}
module.exports = user;