import React from 'react'
import {connect} from 'react-redux'
import {fetchCartInfo, updateToCart, buyCartItem} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {orderId: '', products: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCartInfo(this.props.user.id)

      this.setState({
        orderId: this.props.cart.id,
        products: this.props.cart.products
      })
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

  render() {
    // const cart = this.props.cartProducts
    console.log('this.props', this.props)
    console.log('products', this.props.cart)
    console.log('help', this.props.cart.length)
    if (this.props.cart.products) {
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
        return <div> No items in Cart</div>
      }
    } else {
      return <div>Hi</div>
    }
  }
}

const mapState = state => ({
  cart: state.cartReducer,
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    cartInfo: id => dispatch(fetchCartInfo(id)),

    getCartInfo: id => dispatch(fetchCartInfo(id)),
    updateToCart: id => dispatch(updateToCart(id)),
    buyCartItem: id => dispatch(buyCartItem(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
