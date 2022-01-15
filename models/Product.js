module.exports = (sequelize, type) => {
        return sequelize.define('Product', {
                id: {
                        type: type.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                },
                name: {
                        type: type.STRING,
                        required: true
                },
                description: {
                        type: type.STRING
                },
                price: {
                        type: type.FLOAT,
                        required: true
                },
                img: {
                        type: type.STRING,
                        required: true
                }
        })
};