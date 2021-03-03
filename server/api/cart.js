const router = require('express').Router()
const {Cart} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await Cart.findAll({
      where: {
        userId: req.query.userId
      }
    })
    console.log(user)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
