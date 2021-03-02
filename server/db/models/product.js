const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://p0.pikist.com/photos/575/1/blank-vinyl-record-jacket-record-vinyl-album-audio-black-blank-case-cover.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM('Record', 'Record Player'),
    allowNull: false,
    validate: {
      requiredFields() {
        if (this.type === 'Record' && !this.albumTitle) {
          throw new Error('Requires album title')
        }
      }
    }
  },
  // year: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  albumTitle: {
    type: Sequelize.STRING
  }
})

module.exports = Product
