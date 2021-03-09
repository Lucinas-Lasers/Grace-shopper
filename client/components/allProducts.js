import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllRecordPlayers} from '../store/allRecordPlayers'
import {fetchAllRecords} from '../store/record'
import {fetchCartInfo} from '../store/cart'
import EditProduct from './editProduct'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllRecords()
    this.props.fetchAllRecordPlayers()
  }

  render() {
    return this.props.allRecords && !this.props.allRecords.loading ? (
      <div>
        <h1>ALBUMS</h1>
        <div className="productList">
          {console.log(this.props)}
          {this.props.allRecords.records.map(element => {
            return (
              <div key={element.id} className="productCard">
                <Link to={`/record/${element.id}`}>
                  <div className="productCardItems">
                    <img src={element.image} />
                    <h2>{element.name}</h2>
                    <p>{element.artist}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        <h1>RECORD PLAYERS</h1>
        <div className="albumList">
          {this.props.allRecordPlayers.recordplayers.map(element => {
            return (
              <div key={element.id} className="album">
                <Link to={`/recordplayer/${element.id}`}>
                  <div>
                    <img src={element.image} />
                    <h1>{element.name}</h1>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({
  allRecords: state.recordReducer,
  allRecordPlayers: state.allRecordPlayerReducer
})

const mapDispatch = dispatch => ({
  fetchAllRecords: () => {
    dispatch(fetchAllRecords())
  },
  fetchAllRecordPlayers: () => {
    dispatch(fetchAllRecordPlayers())
  }
})

export const allProducts = connect(mapState, mapDispatch)(AllProducts)
