const Product = require('../models');


const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('./verifyToken');
const router = require('express').Router();

//CREATE

router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body)
        console.log(product);
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json(e);
    }
})

//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            },
            {new: true}
        );
        res.status(200).json(updatedProduct);
    } catch (e) {
        res.status(500).json(e);
    }
});

//DELETE
router.delete(':/id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted')
    } catch (e) {
        res.status(500).json(e);
    }
})

//GET PRODUCT
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json(e);
    }
})

//GET ALL PRODUCTS
router.get('/', async (req, res) => {
        try {
            const products = await Product.findAll({
                limit: 20
            })
            console.log(products);
            res.send(products);
        } catch (e) {
            res.status(500).json(e);
        }
    // const queryNew = req.query.new;
    // const queryCategory = req.query.category;
    // try {
    //     let products;
    //
    //     if (queryNew) {
    //         products = await Product.find().sort({createdAt: -1}).limit(5)
    //     } else if (queryCategory) {
    //         products = await Product.find({categories: {
    //             $in: [queryCategory],
    //             },
    //         });
    //     } else {
    //         products = await Product.find();
    //     }
    //     res.status(200).json(products);
    // } catch (e) {
    //     res.status(500).json(e);
    // }
})

module.exports = router