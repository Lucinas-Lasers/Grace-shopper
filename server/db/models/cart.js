const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  cartProducts: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Cart
