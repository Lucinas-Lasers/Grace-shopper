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
    let randomObject = {}
    if (this.props.allRecords.records) {
      randomObject = this.props.allRecords.records[
        Math.floor(
          Math.random() * Math.floor(this.props.allRecords.records.length - 1)
        )
      ]
    }

    return this.props.allRecords.records &&
      this.props.allRecordPlayers.recordplayers ? (
      <div className="containerHomepage">
        <div className="featuredContainer">
          <div className="featuredText">
            <h1>
              Best
              <br />
              Selling
              <br />
              Album
            </h1>
          </div>

          <Link
            to={`/record/${randomObject.id}`}
            className="featuredObjectContainer"
          >
            <img src={randomObject.image} />
            <h1>{randomObject.name}</h1>
          </Link>
        </div>
        <div>
          <h1>Albums</h1>
          <div className="productBarList">
            {this.props.allRecords.records.map(element => {
              return (
                <Link
                  to={`/record/${element.id}`}
                  key={element.id}
                  className="productBarIcon"
                >
                  <img src={element.image} />
                  <h5>{element.name}</h5>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="containerHomepage">
          <div>
            <h1>Record Players</h1>
            <div className="productBarList">
              {this.props.allRecordPlayers.recordplayers.map(element => {
                return (
                  <Link
                    key={element.id}
                    to={`/recordplayer/${element.id}`}
                    className="productBarIcon"
                  >
                    <img src={element.image} />
                    <h5>{element.name}</h5>
                  </Link>
                )
              })}
            </div>
          </div>
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
