const User = require('./user')
const Product = require('./product')
const Promotion = require('./promotion')
// const Wishlist = require('./wishlist')
const PurchaseHistory = require('./purchaseHistory')
const Cart = require('./cart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Cart.belongsToMany(Product, {through: 'product-cart-table'})

Cart.belongsTo(User)
User.hasOne(Cart)

// User.hasMany(PurchaseHistory)
// PurchaseHistory.hasOne(User)

// Wishlist.belongsToMany(Product, {through: 'product-wishlist-table'})

// User.hasOne(Wishlist)
// Wishlist.belongsTo(User)

Promotion.belongsToMany(Product, {through: 'product-promotion'})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Cart,
  PurchaseHistory,
  // Wishlist,
  Promotion
}
