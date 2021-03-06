const router = require('express').Router()
const {Product, Order, User} = require('../db/models')

module.exports = router

//'API/order'

//show all the orders: to be used only by Admin user

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'albumTitle', 'artist', 'type']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//show all the order information by the specific orderID

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {id: req.params.orderId},
      include: [
        {
          model: Product,
          attributes: ['id', 'albumTitle', 'artist', 'type']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    })

    res.json(order)
  } catch (err) {
    next(err)
  }
})

//show order by userId - right now, this does not filter only for open cart

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userOrder = await User.findAll({
      where: {id: req.params.userId},
      include: [{model: Order}]
    })

    const order = await Order.findAll({
      where: {id: userOrder[0].orders[0].id},
      include: [
        {
          model: Product,
          attributes: ['id', 'albumTitle', 'artist', 'type']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    })

    res.json(order)
  } catch (err) {
    next(err)
  }
})

//update cart content reflecting the action from website

router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await await Order.findAll({
      where: {id: req.params.orderId},
      include: [
        {
          model: Product,
          attributes: ['id', 'albumTitle', 'artist', 'type']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    })
    await order.update(req.body)
  } catch (err) {
    next(err)
  }
})

//No "delete order" API call - user always have one cart.
