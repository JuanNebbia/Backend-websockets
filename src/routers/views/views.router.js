const { Router } = require('express')
const uploader = require('../../utils')
const ProductManager = require('../../managers/ProductManager')

const router = Router()

const productManager = new ProductManager('./products.json')

router.get('/products', async (req, res)=>{
    const products = await productManager.getProducts()
    const limit = req.query.limit
    if(!limit){
        return res.render('home',{
            products: products,
            style: 'home.css',
            title: 'Products'
        })
    }
    const limitedProducts = products.slice(0,limit)
    res.render('home',{
        products: limitedProducts,
        style: 'home.css',
        title: 'Products'
    })
})

router.get('/products/:pid', async (req, res)=>{
    const id = Number(req.params.pid)
    const products = []
    const product = await productManager.getProductById(id)
    if(product.error){
        return res.status(400).send({
            error: product.error
        })
    }
    products.push(product)
    res.render('home',{
        products: products,
        style: 'home.css'
    })
})

router.get('/realtimeproducts', async (req, res)=>{
    const products = await productManager.getProducts()
    const limit = req.query.limit
    if(!limit){
        return res.render('realTimeProducts',{
            products: products,
            style: 'home.css',
            title: 'Real Time Products'
        })
    }
    const limitedProducts = products.slice(0,limit)
    res.render('realTimeProducts',{
        products: limitedProducts,
        style: 'home.css',
        title: 'Real Time Products'
    })
})

module.exports = router