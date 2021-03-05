const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('product-order', {
  qty: {type: Sequelize.INTEGER},
  price: {type: Sequelize.INTEGER}
})

module.exports = ProductOrder
