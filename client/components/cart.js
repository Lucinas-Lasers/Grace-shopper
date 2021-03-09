import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/guestCart'
import {fetchCartInfo, updateToCart, buyCartItem} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orderId: '', products: [], localStorage: {}}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.localStorageChange = this.localStorageChange.bind(this)
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

    //we need to check to see if each individual item is there, and if the quantity is good//turn order to pending to fufilled, delete items from inventiory and send back a new cart
    //redirect person to page with order confirmation page
    //
    // check inventory function, if this function returns true, then we go to another page, else we
    const checkArray = []
    this.state.products.forEach(product => {
      if (product['product-order'].qty > product.quantity) {
        return checkArray.push(false)
      }
    })
    console.log('checkarray', checkArray)
    console.log(this.state.products[0])
    // if (!checkArray.length) {
    //   await Promise.all(
    //     this.state.products.forEach(async (element) => {
    //       console.log(element)
    //       // await this.props.buyToCart(element)
    //     })
    //   )
    // }
    this.setState({products: []})
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
            {this.state.products.map((item, indx) => {
              return (
                <div className="cartItem" key="1">
                  <div>{item.name}</div>
                  <img src={item.image} />
                  <div>
                    <label htmlFor={item.name}>
                      <small>Quantity</small>
                    </label>
                    <input
                      name={item.name}
                      type="number"
                      date="20"
                      value={item['product-order'].qty}
                      onChange={e => this.handleChange(e, indx)}
                    />
                  </div>
                  <div>Price: {(item.price / 1000).toFixed(2)}</div>
                  <div>
                    Total Price:{' '}
                    {(item['product-order'].qty * item.price / 1000).toFixed(2)}
                  </div>
                </div>
              )
            })}
            <div>
              Purchase Total:{' '}
              {this.state.products
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

      return (
        <div className="cartList">
          {console.log('2')}
          {productsStorage.map(product => {
            let item = product.data
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
    cartInfo: id => dispatch(fetchCartInfo(id)),

    getCartInfo: id => dispatch(fetchCartInfo(id)),

    getProducts: id => dispatch(fetchProduct(id)),
    updateToCart: id => dispatch(updateToCart(id)),
    buyCartItem: id => dispatch(buyCartItem(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
