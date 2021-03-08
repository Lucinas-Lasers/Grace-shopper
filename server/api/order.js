const router = require('express').Router()
const {Product, Order, User, ProductOrder} = require('../db/models')

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

//show order by userId - only 1 open order will display - assumption is user only has 1 open cart.

router.get('/user/:userId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'open'
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'artist', 'type', 'price', 'image']
        },
        {
          model: User,
          where: {id: req.params.userId},
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
    const [order, status] = await ProductOrder.findOrCreate({
      where: {
        orderId: req.params.orderId,
        productId: req.body.productId
      },
      defaults: {
        orderId: req.params.orderId,
        productId: req.body.productId,
        price: req.body.price,
        qty: req.body.qty
      }
    })
    if (!status) {
      await order.update(req.body)
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//No "delete order" API call - user always have one cart.
