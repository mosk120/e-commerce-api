const router = require('express').Router();
// const User = require('../models/user')
const User = require('../sequelize');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
//Register
// router.post('/register', async (req, res) => {
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: CryptoJS.AES.encrypt(
//             req.body.password,
//             process.env.PASS_SEC
//         ).toString()
//     });
//
//     try {
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (e) {
//         res.status(500).json(e);
//         console.log(e);
//     }
// });
router.post('/register', async (req, res) => {

    try {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString()
        };
        if (data.password === '' || data.username === '') {
            res.json('username and password required')
        }

        const user = await User.findOne({
            where: {
                username: data.username
            }
        });

        if (user !== null) {
            res.json('username already taken')
        } else {
            User.create({
                username: data.username,
                email: data.email,
                password: data.password
            });
            res.status(201).json('User created');
        }
    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }
})

//Login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json('Wrong credentials');
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json('Wrong credentials');

        const accessToken = JWT.sign({
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            {expiresIn:'3d'}
        );

        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});
    } catch (e) {
        res.status(500).json(e);
    }

})

module.exports = router;