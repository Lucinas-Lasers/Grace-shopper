const router = require('express').Router()
const {product} = require('../db/models')
module.exports = router

router.get('./api/allRecords', async (req, res, next) => {
  const allRecords = await product.findAll()
})
