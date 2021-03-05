const Sequelize = require('sequelize')
const db = require('../db')

//030521 YF created

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'fulfilled')
  },
  promoCode: {type: Sequelize.TEXT},
  fulfillmentDate: {type: Sequelize.DATE}
})

module.exports = Order
