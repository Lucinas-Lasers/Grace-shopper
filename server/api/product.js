const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

router.get('/type/:type', async (req, res, next) => {
  try {
    // axios request has to be api/products/record player

    const recordPlayer = await Product.findAll({
      where: {type: `${req.params.type}`}
    })

    res.json(recordPlayer)
  } catch (err) {
    next(err)
  }
})
