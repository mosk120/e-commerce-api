const { Sequelize } = require("sequelize");
const NewUser = require('./models/user')

const sequelize = new Sequelize('e_commerce_db', 'mosk120', '1488Oblivion', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = NewUser(sequelize, Sequelize);

sequelize.sync()
.then(() => {
    console.log('DB and user table have been created')
})

module.exports = User;