const Sequelize = require('sequelize')
const db = require('../db')

const Wishlist = db.define('wishlist', {
  products: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Wishlist
