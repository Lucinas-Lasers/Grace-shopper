const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

//API/products

router.get('/type/:type', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {type: `${req.params.type}`}
    })

    res.json(products)
  } catch (err) {
    next(err)
  }
})

//only user with admin === true can post new product

router.post('/', async (req, res, next) => {
  try {
    if (!req.user || req.user.admin === false) {
      res.status(404).send(`you are not allowed to create a product`)
    } else {
      const product = await Product.create(req.body)
      res.status(201).json(product)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// only userAdmin can modify product data
router.put('/:id', async (req, res, next) => {
  try {
    if (!req.user || req.user.admin === false) {
      res.status(404).send(`you are not allowed to modify product`)
    } else {
      console.log('help')
      const product = await Product.findByPk(req.params.id)
      await product.update(req.body)
      res.status(204).json(product)
    }
  } catch (err) {
    next(err)
  }
})

// only userAdmin can delete product data
router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.user || req.user.admin === false) {
      res.status(404).send(`you are not allowed to delete product`)
    } else {
      const product = await Product.findByPk(req.params.id)
      await product.destroy()
      res.json(product)
    }
  } catch (err) {
    next(err)
  }
})
