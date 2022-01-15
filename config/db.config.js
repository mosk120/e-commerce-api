module.exports = {
    HOST: 'localhost',
    USER: 'mosk120',
    PASSWORD: '1488Oblivion',
    DB: 'e_commerce_db',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};