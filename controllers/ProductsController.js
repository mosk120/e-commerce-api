const {Product} = require('../models');

module.exports = {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                limit: 20
            })
            res.send(products);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async addNewProduct(req, res) {
        try {
            const product = await Product.create(req.body)
            console.log('check')
            res.send(product);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}