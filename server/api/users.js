const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

//'API/users'

//get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get single user

// explicitly avaialble : id name, and email
// YF 3/6/21: users' passwords are not visible

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {id: req.params.userId},
      attributes: ['id', 'firstName', 'middleName', 'lastName', 'email']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//only user with admin === true can modify user info
router.put('/:userId', async (req, res, next) => {
  try {
    if (!req.user || req.user.admin === false) {
      res.status(404).send(`you are not allowed to modify user information`)
    } else {
      const user = await User.findAll({
        where: {id: req.params.userId},
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'email']
      })

      await user.update(req.body)
      res.status(204).json(user)
    }
  } catch (err) {
    next(err)
  }
})

//get users' order history info
// YF 3.6.21 still needs refinment to pull the actual ordered item and quantities

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const userOrder = await User.findAll({
      where: {id: req.params.userId},
      include: [{model: Order}],
      attributes: ['id', 'firstName', 'middleName', 'lastName', 'email']
    })

    res.json(userOrder)
  } catch (err) {
    next(err)
  }
})
