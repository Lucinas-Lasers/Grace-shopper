import React from 'react'

const dummy = [
  {
    name: 'album1',
    img: 'https://i.imgur.com/QErPh1R.png',
    description: 'Mooo-sic',
    price: '5.99',
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
    price: '5.99',
    qty: '100000',
    productAmount: 1,
    year: '2000',
    type: 'album',
    artist: 'ACDC',
    genre: 'rock',
    tracks: 'song1,song2,song3'
  }
]

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = dummy
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e, indx) {
    let item = this.state
    item[indx].productAmount = e.target.value
    this.setState([item])
    console.log(this.state)
  }

  render() {
    console.log(this.state)
    return (
      <div className="cartList">
        {this.state.map((item, indx) => {
          return (
            <div className="cartItem" key="1">
              <div>{item.name}</div>
              <img src={item.img} />
              <div>
                <label htmlFor={item.name}>
                  <small>amount</small>
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
      </div>
    )
  }
}
