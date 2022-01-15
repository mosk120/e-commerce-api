const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models')
const app = express();
const dotenv = require('dotenv');
const port = 5000;
const routes = require('./routes');
// const productRoute = require('./routes/product');
// const cartRoute = require('./routes/cart');
// const orderRoute = require('./routes/order');

dotenv.config();
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json())
sequelize.sync({force: false})
    .then(() => {
        app.listen(process.env.port || port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        })
    })
app.use('/api/auth', routes);

