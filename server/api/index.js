const router = require('express').Router()
module.exports = router

//orders and orders by users ("cart")
router.use('/order', require('./order'))

//products data
router.use('/products', require('./products'))

//users data
router.use('/users', require('./users'))
router.use('/admin', require('./admin'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
