const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

router.get('/type/:type', async (req, res, next) => {
  try {
    // axios request has to be api/products/record recordPlayer

    const recordPlayer = await Product.findAll({
      where: {type: `${req.params.type}`}
    })

    res.json(recordPlayer)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const record = await Product.create(req.body)
    res.status(201).json(record)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const record = await Product.findByPk(req.params.id)
    res.json(record)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const record = await Product.find(req.params.id)
    await record.update(req.body)
    res.res.status(204).json(record)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const record = await Product.findByPk(req.params.id)
    await record.destroy()
    res.json(record)
  } catch (err) {
    next(err)
  }
})
