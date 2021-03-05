const User = require('./user')
const Product = require('./product')
const Promotion = require('./promotion')

// const Wishlist = require('./wishlist')
const Order = require('./order')
const ProductOrder = require('./product-order')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//030521 YF included Order and ProductOrder
//030521 YF updated association between Order and Product Order

Order.belongsToMany(Product, {through: 'product-order'})
Product.belongsToMany(Order, {through: 'product-order'})

Order.belongsTo(User)
User.hasMany(Order)

// Wishlist.belongsToMany(Product, {through: 'product-wishlist-table'})

// User.hasOne(Wishlist)
// Wishlist.belongsTo(User)

Promotion.belongsToMany(Product, {through: 'product-promotion'})
Promotion.belongsToMany(Order, {through: 'order-promotion'})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,

  Order,
  ProductOrder,
  //Wishlist,

  Promotion
}
