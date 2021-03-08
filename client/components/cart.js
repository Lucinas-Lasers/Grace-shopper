import React from 'react'
import {connect} from 'react-redux'
import {fetchCartInfo} from '../store/cart'
import {fetchProduct} from '../store/guestCart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orderId: '', products: []}
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
    } else if (!this.props.user.id) {
      let localStorage = JSON.parse(window.localStorage.getItem('cart'))
      const localProducts = Object.entries(localStorage)
      this.props.getProducts(localProducts)
      this.setState(localStorage)
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

  handleChange(e, indx) {
    console.log('e', e)
    let item = this.state.products
    item[indx]['product-order'].qty = e.target.value
    this.setState({products: item})
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('submitted')
    this.setState({products: []})
  }

  localStorageChange(e, id) {
    let newNumber = e.target.value
    let localStorage = JSON.parse(window.localStorage.getItem('cart'))
    localStorage[id].qty = newNumber
    window.localStorage.setItem('cart', JSON.stringify(localStorage))
    this.setState(localStorage)
  }

  render() {
    // const cart = this.props.cartProducts
    // console.log('this.props', this.props)
    // console.log('products', this.props.cart.products)
    // console.log('help', this.props.cart.length)
    if (this.props.cart.userId) {
      if (this.props.cart.products.length) {
        return (
          <div className="cartList">
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
                      value={item['product-order'].qty}
                      onChange={e => this.handleChange(e, indx)}
                    />
                  </div>
                </div>
              )
            })}
            <div>
              Price:{' '}
              {this.state.products
                .reduce((accumulator, current) => {
                  return (
                    accumulator + current['product-order'].qty * current.price
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
        return <div>No Products</div>
      }
    } else if (window.localStorage.getItem('cart')) {
      let productsStorage = this.props.guestProducts

      return (
        <div className="cartList">
          {productsStorage.map(product => {
            let item = product.data
            return (
              <div className="cartItem" key="1">
                <div>{item.name}</div>
                <img src={item.image} />
                <p>
                  Price: {`$${(item.price / 1000).toFixed(2)}`}{' '}
                  {`($${(item.price * this.state[item.id].qty / 1000).toFixed(
                    2
                  )})`}
                </p>
                <div>
                  <label htmlFor={item.name}>
                    <small>Quantity</small>
                  </label>
                  <input
                    name={item.name}
                    type="number"
                    value={this.state[item.id].qty}
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
                JSON.parse(this.state[currentElem.data.id].qty) *
                  JSON.parse(currentElem.data.price)
              )
            }, 0) / 1000
          ).toFixed(2)}`}
        </div>
      )
    } else {
      return <div>No cart, buster.</div>
    }
  }
}

const mapState = state => ({
  cart: state.cartReducer,
  user: state.user,

  guestProducts: state.guestReducer.cart
})

const mapDispatch = dispatch => {
  return {
    cartInfo: id => dispatch(fetchCartInfo(id)),

    getCartInfo: id => dispatch(fetchCartInfo(id)),

    getProducts: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
