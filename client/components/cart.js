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
    this.state = {historyArray: dummy}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    let result = await this.props.cartInfo({userId: 2})
    console.log('resu;t', result)
  }

  handleChange(e, indx) {
    let item = this.state.historyArray
    item[indx].productAmount = e.target.value
    this.setState({historyArray: item})
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('submitted')
    this.setState({historyArray: []})
  }

  render() {
    // console.log('this.props in render', this.props)
    // console.log('this.props.cart in render', this.props.cartProducts)

    // const overallPrice =
    // console.log(overallPrice)
    return (
      <div className="cartList">
        {this.state.historyArray.map((item, indx) => {
          return (
            <div className="cartItem" key="1">
              <div>{item.name}</div>
              <img src={item.img} />
              <div>
                <label htmlFor={item.name}>
                  <small>Quantity</small>
                </label>
                <input
                  name={item.name}
                  type="number"
                  value={item.productAmount}
                  onChange={e => this.handleChange(e, indx)}
                />
              </div>
            </div>
          )
        })}
        <div>
          Price:{' '}
          {this.state.historyArray
            .reduce((accumulator, current) => {
              return accumulator + current.productAmount * current.price
            }, 0)
            .toFixed(2)}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Purchase" />
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  cartProducts: state.products
})

const mapDispatch = dispatch => {
  return {
    cartInfo: id => dispatch(fetchCartInfo(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
