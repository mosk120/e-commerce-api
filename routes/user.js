const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const CryptoJS = require("crypto-js");
// const User = require('../models/User')
const User = require('../models');
const router = require('express').Router();

router.put('/:uuid', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {

        const result = await User.update(
            {username: req.body.username},
            {
                where: {
                    uuid: req.params.uuid
                }
            }
        )

        res.status(200).json('User updated');

    } catch (e) {
        res.status(500).json(e);
    }
});

//DELETE
router.delete('/:uuid', verifyTokenAndAuthorization, async (req, res) => {
    try {

        const result = await User.destroy(
            {
                where: {
                    uuid: req.params.uuid
                }
            }
        )

        res.status(200).json('User has been deleted');
    } catch (e) {
        res.status(500).json(e);
    }
})

//GET USER
router.get('/find/:uuid', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.params.uuid
            },
            attributes: {
                exclude: ['password']
            }
        });
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
})

//GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.findAll({order: [['username', 'ASC']]}, { limit: 5 })
            : await User.findAll();
        console.log(await User.findAll({order: [['username', 'ASC']]}, { limit: 5 }))
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
})

//GET USER STATS

// router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//
//     try {
//         const data = await User.aggregate([
//             {$match: {createdAt: {$gte: lastYear}}},
//             {
//                 $project: {
//                     month: {$month: '$createdAt'}
//                 },
//             },
//             {
//                 $group: {
//                     _id: '$month',
//                     total: {$sum: 1},
//                 }
//             }
//         ])
//         res.status(200).json(data);
//     } catch (e) {
//         res.status(500).json(e);
//     }
// })

module.exports = router