const Sequelize = require('sequelize')
const db = require('../db')

// Associated with product-order table (ManyToMany)
// Associated with user table (oneToMany)

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'fulfilled')
  },
  promoCode: {type: Sequelize.TEXT},
  fulfillmentDate: {type: Sequelize.DATE},
  total: {type: Sequelize.INTEGER, defaultValue: 0}
})

module.exports = Order
