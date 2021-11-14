module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        uuid: {
            type: type.UUID,
            defaultValue: type.UUIDV4
        },
        username: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: type.STRING,
            unique: true
        },
        password: type.STRING,
        isAdmin: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
    })
};