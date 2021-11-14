const { Sequelize } = require('sequelize');

// const UserSchema = new mongoose.Schema(
//     {
//         username: {type: String, required: true, unique: true},
//         email: {type: String, required: true, unique: true},
//         password: {type: String, required: true},
//         isAdmin: {
//             type: Boolean,
//             default: false,
//         },
//     },
//     {timestamps: true}
// );

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
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
        password: type.STRING
    })
};