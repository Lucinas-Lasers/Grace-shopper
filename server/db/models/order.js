const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['open', 'fulfilled'],
    defaultValue: ['open']
  },
  promoCode: {type: Sequelize.TEXT},
  fulfillmentDate: {type: Sequelize.DATE}
})

module.exports = Order
