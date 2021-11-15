const router = require('express').Router();
const User = require('../sequelize');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
//Register
router.post('/register', async (req, res) => {
    try {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        if (!data.password || data.username === '' || data.email === '') {
            console.log(data.password, 'password')
            res.json('username, email and password required')
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
                password: CryptoJS.AES.encrypt(
                    data.password,
                    process.env.PASS_SEC).toString()
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
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        !user && res.status(401).json('Wrong credentials');

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json('Wrong credentials');

        const accessToken = JWT.sign({
                id: user.id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            {expiresIn:'3d'}
        );

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: accessToken
        });
    } catch (e) {
        res.status(500).json(e);
    }

})

module.exports = router;