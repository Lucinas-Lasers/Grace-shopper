const router = require('express').Router()
const {Cart, User} = require('../db/models')

module.exports = router

//'API/cart'

//show all the users with cartID: to be used only by Admin user

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      include: {model: User}
    })
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

//show all the cart information by the specific cartID

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {userId: req.params.userId},
      include: {model: User}
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

//update cart content reflecting the action from website

router.put('/:cartId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId)
    await cart.update(req.body)
  } catch (err) {
    next(err)
  }
})

//No cart delete cart API call - user always have one cart.
