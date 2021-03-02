const Sequelize = require('sequelize')
const db = require('../db')

const PurchaseHistory = db.define('purchaseHistory', {
  purchaseProducts: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  purchaseDate: {
    type: Sequelize.STRING
  }
})

module.exports = PurchaseHistory
