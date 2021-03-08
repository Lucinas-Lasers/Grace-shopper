import React from 'react'
import {connect} from 'react-redux'
import {fetchCartInfo} from '../store/cart'

const dummy = [
  {
    name: 'album1',
    img: 'https://i.imgur.com/QErPh1R.png',
    description: 'Mooo-sic',
    price: 5.99,
    qty: '100000',
    productAmount: 2,
    year: '2000',
    type: 'album',
    artist: 'ACDC',
    genre: 'rock',
    tracks: 'song1,song2,song3'
  },
  {
    name: 'album2',
    img: 'https://i.imgur.com/QErPh1R.png',
    description: 'Mooo-sic',
    price: 2.99,
    qty: '100000',
    productAmount: 1,
    year: '2000',
    type: 'album',
    artist: 'ACDC',
    genre: 'rock',
    tracks: 'song1,song2,song3'
  }
]

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

  render() {
    // const cart = this.props.cartProducts
    console.log('this.props', this.props)
    console.log('products', this.props.cart.products)
    console.log('help', this.props.cart.length)
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

    getCartInfo: id => dispatch(fetchCartInfo(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
