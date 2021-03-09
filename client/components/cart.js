import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/guestCart'
import {
  fetchCartInfo,
  updateToCart,
  buyCartItem,
  orderFulfilled,
  removeItem
} from '../store/cart'

import {setConfirmedProducts} from '../store/confirmationReducer'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orderId: '', products: [], localStorage: {}}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.localStorageChange = this.localStorageChange.bind(this)
    this.remove = this.remove.bind(this)
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCartInfo(this.props.user.id)
      this.setState({
        orderId: this.props.cart.id,
        products: this.props.cart.products
      })
    } else if (!this.props.user.id && window.localStorage.getItem('cart')) {
      let localStorage = JSON.parse(window.localStorage.getItem('cart'))
      const localProducts = Object.entries(localStorage)
      this.props.getProducts(localProducts)
      this.setState({localStorage})
      // localProducts.forEach((product) => this.props.getProducts(product[0]))
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.user.id && this.props.user.id !== prevProps.user.id) {
      await this.props.getCartInfo(this.props.user.id)
      this.setState({
        orderId: this.props.cart.id,
        products: this.props.cart.products
      })
    }
  }

  async remove(e) {
    await this.props.removeItem({
      orderId: this.state.orderId,
      productId: e.target.name
    })
    await this.props.getCartInfo(this.props.user.id)
  }

  async handleChange(e, indx) {
    let item = this.state.products
    item[indx]['product-order'].qty = e.target.value
    item[indx]['product-order'].price =
      item[indx]['product-order'].qty * item[indx].price
    await this.props.updateToCart(item[indx]['product-order'])
    this.setState({products: item})
    await this.props.getCartInfo(this.props.user.id)
  }

  async handleSubmit(e) {
    e.preventDefault()
    console.log('submitted')

    const checkArray = []
    this.state.products.forEach(product => {
      if (product['product-order'].qty > product.quantity) {
        return checkArray.push(product)
      }
    })
    console.log('checkarray', this.state.products)

    if (!checkArray.length) {
      await this.state.products.forEach(element => {
        this.props.buyCartItem({
          id: element.id,
          quantity: element['product-order'].qty
        })
      })

      await this.props.orderFulfilled({
        orderId: this.state.orderId,
        status: 'fulfilled',
        userId: this.props.user.id
      })
      console.log('inside', this.state.products)
      this.setConfirmedProducts(this.state.products)
      this.setState({products: []})
    } else {
      return <div>Not enough of Item</div>
    }
  }

  localStorageChange(e, id) {
    let newNumber = e.target.value
    let localStorage = JSON.parse(window.localStorage.getItem('cart'))
    localStorage[id].qty = newNumber
    window.localStorage.setItem('cart', JSON.stringify(localStorage))
    this.setState({localStorage})
  }

  render() {
    // const cart = this.props.cartProducts
    // console.log('this.props', this.props)
    // console.log('products', this.props.cart.products)
    // console.log('help', this.props.cart.length)
    if (this.props.user && !this.props.loading) {
      // if user is logged in
      // if (this.props.cart.products) {
      if (this.props.cart.products && this.props.cart.products.length) {
        // if user has items in cart
        return (
          <div className="cartList">
            {console.log('1')}
            {this.props.cart.products.map((item, indx) => {
              return (
                <div className="cartItem" key={item.id}>
                  <div>{item.name}</div>
                  <img src={item.image} />
                  <div>
                    <label htmlFor={item.name}>
                      <small>Quantity</small>
                    </label>
                    <input
                      name={item.name}
                      type="number"
                      min="0"
                      value={item['product-order'].qty}
                      onChange={e => this.handleChange(e, indx)}
                    />
                  </div>
                  <div>Price: {(item.price / 1000).toFixed(2)}</div>
                  <div>
                    Total Price:{' '}
                    {(item['product-order'].qty * item.price / 1000).toFixed(2)}
                    <button
                      id="remove"
                      type="button"
                      name={item['product-order'].productId}
                      onClick={e => this.remove(e)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              )
            })}
            <div>
              Purchase Total:{' '}
              {this.props.cart.products
                .reduce((accumulator, current) => {
                  return (
                    accumulator +
                    current['product-order'].qty * current.price / 1000
                  )
                }, 0)
                .toFixed(2)}
            </div>
            <form onSubmit={this.handleSubmit}>
              <input type="submit" value="Purchase" />
            </form>
          </div>
        )
      } else {
        // user doesn't have items
        return <div> No items in Cart</div>
      }
    } else if (window.localStorage.getItem('cart')) {
      // the guest user isn't logged in
      let productsStorage = this.props.guestProducts
      console.log('help', this.state.localStorage)
      return (
        <div className="cartList">
          {console.log('2')}
          {productsStorage.map(product => {
            let item = product.data
            console.log('ITEM', item)
            console.log('id', item.id)
            return (
              <div className="cartItem" key="1">
                <div>{item.name}</div>
                <img src={item.image} />
                <p>
                  Price: {`$${(item.price / 1000).toFixed(2)}`}{' '}
                  {`($${(
                    item.price *
                    this.state.localStorage[item.id].qty /
                    1000
                  ).toFixed(2)})`}
                </p>
                <div>
                  <label htmlFor={item.name}>
                    <small>Quantity</small>
                  </label>
                  <input
                    name={item.name}
                    type="number"
                    value={this.state.localStorage[item.id].qty}
                    min="1"
                    max={`${item.quantity}`}
                    onChange={e => {
                      this.localStorageChange(e, item.id)
                    }}
                  />
                </div>
              </div>
            )
          })}
          {`Price: ${(
            productsStorage.reduce((accumulator, currentElem) => {
              return (
                accumulator +
                JSON.parse(this.state.localStorage[currentElem.data.id].qty) *
                  JSON.parse(currentElem.data.price)
              )
            }, 0) / 1000
          ).toFixed(2)}`}
        </div>
      )
    } else {
      // if guest user cart is empty
      return <div>No cart, buster.</div>
    }
  }
}

const mapState = state => ({
  cart: state.cartReducer.cart[0],
  loading: state.cartReducer.loading,
  user: state.user,
  guestProducts: state.guestReducer.cart
})

const mapDispatch = dispatch => {
  return {
    setConfirmedProducts: array => dispatch(setConfirmedProducts(array)),

    cartInfo: id => dispatch(fetchCartInfo(id)),
    getCartInfo: id => dispatch(fetchCartInfo(id)),

    getProducts: id => dispatch(fetchProduct(id)),
    updateToCart: id => dispatch(updateToCart(id)),
    buyCartItem: id => dispatch(buyCartItem(id)),
    orderFulfilled: id => dispatch(orderFulfilled(id)),
    removeItem: id => dispatch(removeItem(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
