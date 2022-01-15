const routes = require('express').Router();
const authPolicy = require('./policies/authPolicy');
const AuthenticationController = require('./controllers/AuthenticationController')
const ProductsController = require('./controllers/ProductsController')
//Authentication routes
routes.post('/register', authPolicy.register, AuthenticationController.register)
routes.post('/login', AuthenticationController.login);
//Products routes
routes.get('/products', ProductsController.getAllProducts);
routes.post('/products', ProductsController.addNewProduct);

module.exports = routes;