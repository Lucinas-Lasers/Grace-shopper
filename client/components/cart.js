import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, resetLoading, deleteProduct} from '../store/guestCart'
import {
  fetchCartInfo,
  updateToCart,
  buyCartItem,
  orderFulfilled,
  removeItem,
  userCartLoading
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
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCartInfo(this.props.user.id)
    } else if (!this.props.user.id && window.localStorage.getItem('cart')) {
      console.log('Componenet guest')
      let localStorage = JSON.parse(window.localStorage.getItem('cart'))
      const localProducts = Object.entries(localStorage)
      this.props.getProducts(localProducts)
      this.setState({localStorage})
      // localProducts.forEach((product) => this.props.getProducts(product[0]))
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.user.id && this.props.user.id !== prevProps.user.id) {
      this.props.getCartInfo(this.props.user.id)
    }
  }

  async remove(e) {
    console.log('hep', this.props.cart)
    // e.preventDefault()
    console.log('10', this.props.cart)
    await this.props.removeItem({
      orderId: this.props.cart.id,
      productId: e.target.name
    })

    console.log('11', this.props.cart)

    // this.props.getCartInfo(this.props.user.id)
  }

  async handleChange(e, indx) {
    e.preventDefault()
    if (this.props.user) {
      let item = this.props.cart.products
      console.log(item, 'helpppp')
      item[indx]['product-order'].qty = e.target.value
      item[indx]['product-order'].price =
        item[indx]['product-order'].qty * item[indx].price
      await this.props.updateToCart(item[indx]['product-order'])
      await this.props.getCartInfo(this.props.user.id)
    }
  }

  //guest submit
  handleGuestSubmit(e) {
    e.preventDefault()
    const id = e.target.name
    this.props.deleteProduct(id)
    const storage = JSON.parse(window.localStorage.getItem('cart'))
    delete storage[id]
    this.setState({localStorage: storage})
    window.localStorage.setItem('cart', JSON.stringify(storage))
  }
  //guest storage
  localStorageChange(e, id) {
    let newNumber = e.target.value
    let localStorage = JSON.parse(window.localStorage.getItem('cart'))
    localStorage[id].qty = newNumber
    window.localStorage.setItem('cart', JSON.stringify(localStorage))
    this.setState({localStorage})
  }

  async handleSubmit(e) {
    e.preventDefault()
    const checkArray = []
    this.props.cart.products.forEach(product => {
      if (product['product-order'].qty <= product.quantity) {
        return checkArray.push(product)
      }
    })
    console.log('checkarray', this.props.cart.products)

    if (
      checkArray.length &&
      checkArray.length === this.props.cart.products.length
    ) {
      await this.props.cart.products.forEach(element => {
        this.props.buyCartItem({
          id: element.id,
          quantity: element['product-order'].qty
        })
      })

      await this.props.orderFulfilled({
        orderId: this.props.cart.id,
        status: 'fulfilled',
        userId: this.props.user.id
      })

      this.props.setConfirmedProducts(checkArray)
      this.setState({products: []})
    } else {
      return <div>Not enough of Item</div>
    }
  }

  componentWillUnmount() {
    this.props.guestLoad()
    this.props.userLoad()
  }

  render() {
    // const cart = this.props.cartProducts
    // console.log('this.props', this.props)
    // console.log('products', this.props.cart.products)
    // console.log('help', this.props.cart.length)
    if (this.props.user && !this.props.loading) {
      console.log(this.props.user, this.props.loading)
      // if user is logged in
      // if (this.props.cart.products) {
      if (this.props.cart.products && this.props.cart.products.length) {
        // if user has items in cart
        return (
          <div className="cartList">
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
    } else if (
      !Object.keys(JSON.parse(window.localStorage.getItem('cart'))).length ==
        0 &&
      !this.props.user.id
    ) {
      if (!this.props.guestLoading) {
        // the guest user isn't logged in
        let productsStorage = this.props.guestProducts

        return (
          <div className="cartList">
            {console.log('2')}
            {productsStorage.map(product => {
              let item = product.data
              console.log(item.id, 'id')
              return (
                <div className="cartItem" key={item.id}>
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
                      value={this.state.localStorage[item.id].qty} // parse qty
                      min="1"
                      max={`${item.quantity}`}
                      onChange={e => {
                        this.localStorageChange(e, item.id)
                      }}
                    />
                  </div>
                  <button
                    id="remove"
                    type="button"
                    name={[item.id]}
                    onClick={e => this.handleGuestSubmit(e)}
                  >
                    Remove Item
                  </button>
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
        return <div>Loading...</div>
      }
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
  guestProducts: state.guestReducer.cart,
  guestLoading: state.guestReducer.loading
})

const mapDispatch = dispatch => {
  return {
    deleteProduct: id => dispatch(deleteProduct(id)),
    guestLoad: () => dispatch(resetLoading()),
    userLoad: () => dispatch(userCartLoading()),
    setConfirmedProducts: array => dispatch(setConfirmedProducts(array)),
    getCartInfo: id => dispatch(fetchCartInfo(id)),
    getProducts: id => dispatch(fetchProduct(id)),
    updateToCart: id => dispatch(updateToCart(id)),
    buyCartItem: id => dispatch(buyCartItem(id)),
    orderFulfilled: id => dispatch(orderFulfilled(id)),
    removeItem: id => dispatch(removeItem(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
