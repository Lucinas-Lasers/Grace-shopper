const Sequelize = require('sequelize')
const db = require('../db')

const PaymentOption = db.define('paymentOption', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isCreditCard: true
    }
  }
})

module.exports = PaymentOption
