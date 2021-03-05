const router = require('express').Router()
const {User, Order} = require('../db/models')
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

//get user and order info
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {id: req.params.userId},
      include: {model: Order}
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
