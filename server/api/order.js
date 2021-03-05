const router = require('express').Router()
const {Product, Order, ProductOrder, User} = require('../db/models')

module.exports = router

//'API/order'

//show all the orders: to be used only by Admin user

router.get('/', async (req, res, next) => {
  try {
    const orders = await ProductOrder.findAll({
      //include: {model: Product},
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//show all the order information by the specific orderID

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await ProductOrder.findAll({
      where: {orderId: req.params.orderId}
      //include: {model: Product},
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//update cart content reflecting the action from website

router.put('/:orderId', async (req, res, next) => {
  try {
    const cart = await ProductOrder.findAll({
      where: {orderId: req.params.orderId}
    })
    await cart.update(req.body)
  } catch (err) {
    next(err)
  }
})

//No cart delete cart API call - user always have one cart.
