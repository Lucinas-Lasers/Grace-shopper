const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

//030521 - Currently Not using this routes. DO NOT TOUCH

router.get('/', async (req, res, next) => {
  try {
    //so axios call to backend will include a parameter for type
    //axios--> get/products with 1 parameter

    //match.params.id===allRecords
    //if  *match.params.id===allRecordd, then type : '...
    //paramter if === Record, gets records
    //if === record player, get record player

    const allRecords = await Product.findAll({where: {type: 'Record'}})

    res.json(allRecords)
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
