import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllRecords, deleteSingleRecord} from '../store/record'
import EditProduct from './editProduct'
import {fetchCartInfo} from '../store/cart'

class AllRecords extends React.Component {
  componentDidMount() {
    this.props.fetchAllRecords()
    if (this.props.user.id) {
      this.props.getCartInfo(this.props.user.id)
    }
  }
  componentDidUpdate(prevprops) {
    if (this.props.user.id && this.props.user.id !== prevprops.user.id) {
      this.props.getCartInfo(this.props.user.id)
    }
  }

  render() {
    return !this.props.allRecords.loading ? (
      <div className="productList">
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
              {this.props.user && this.props.user.admin ? (
                <EditProduct
                  deleteItem={this.props.deleteSingleRecord}
                  product={element.id}
                  type={element.type}
                />
              ) : (
                <div />
              )}
            </div>
          )
        })}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({
  allRecords: state.recordReducer,
  user: state.user,
  cart: state.cartReducer.cart[0]
})

const mapDispatch = dispatch => ({
  fetchAllRecords: () => {
    dispatch(fetchAllRecords())
  },
  deleteSingleRecord: id => {
    dispatch(deleteSingleRecord(id))
  },
  getCartInfo: id => dispatch(fetchCartInfo(id))
})

export const allRecords = connect(mapState, mapDispatch)(AllRecords)
