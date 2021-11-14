const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const mysql = require('mysql');
const dotenv = require('dotenv');
const port = 5000;
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

dotenv.config();

app.listen(process.env.port || port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

// const connectDB = async () => {
//     try {
//         await mongoose.connect(
//             process.env.MONGO_URL
//         );
//         console.log('MongoDB connected');
//     } catch (e) {
//         console.log('Failed to connect to MongoDB', e);
//     }
// }

//Create connection to mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'mosk120',
    password: '1488Oblivion',
    database: 'e_commerce_db'
});

db.connect((e) => {
    if (e) {
        throw e;
    }
    console.log('MySql Connected...');
});

//Create DB
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE e_commerce_db';
//     db.query(sql, (e, result) => {
//         if (e) throw e;
//         console.log(result);
//         res.status(200).json('database created');
//     })
// })


app.use(express.json())
 app.use('/api/users', userRoute);
// app.use('/api/auth', authRoute);
// app.use('/api/products', productRoute);
// app.use('/api/carts', cartRoute);
// app.use('/api/orders', orderRoute);
app.use('/api/auth', authRoute);


//connectDB();


