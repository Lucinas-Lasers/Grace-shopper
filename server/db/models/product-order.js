const Sequelize = require('sequelize')
const db = require('../db')

//This is essentially the cart info
//Associated with Order
//Associated with Product

const ProductOrder = db.define('product-order', {
  qty: {type: Sequelize.INTEGER},
  price: {type: Sequelize.INTEGER}
})

module.exports = ProductOrder
