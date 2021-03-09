const Sequelize = require('sequelize')
const db = require('../db')

// Associated with product-order table (ManyToMany)
// Associated with user table (oneToMany)

//yf 03/08/21 updated total field to be totalPrice and totalItem fields

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'fulfilled')
  },
  promoCode: {type: Sequelize.TEXT},
  fulfillmentDate: {type: Sequelize.DATE},
  totalPrice: {type: Sequelize.INTEGER, defaultValue: 0},
  totalItems: {type: Sequelize.INTEGER, defaultValue: 0}
})

module.exports = Order
