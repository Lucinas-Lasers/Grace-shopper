const Sequelize = require('sequelize')
const db = require('../db')

const Promotion = db.define('promotion', {
  discountAmount: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  discountCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  beginningDate: {
    type: Sequelize.STRING
  },
  endDate: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Promotion
