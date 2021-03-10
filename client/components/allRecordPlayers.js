import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchAllRecordPlayers,
  deleteSingleRecordPlayer
} from '../store/allRecordPlayers'
import {fetchCartInfo} from '../store/cart'
import EditProduct from './editProduct'

class AllRecordPlayers extends React.Component {
  componentDidMount() {
    this.props.fetchAllRecordPlayers()
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
    return !this.props.allRecordPlayers.loading ? (
      <div className="productList">
        {this.props.allRecordPlayers.recordplayers.map(element => {
          return (
            <Link key={element.id} to={`/recordplayer/${element.id}`}>
              <div className="productCard">
                <Link
                  to={`/recordplayer/${element.id}`}
                  className="productCardItems"
                >
                  <div>
                    <img src={element.image} />
                    <h1>{element.name}</h1>
                  </div>
                </Link>
                {this.props.user && this.props.user.admin ? (
                  <EditProduct
                    deleteItem={this.props.deleteSingleRecordPlayer}
                    product={element.id}
                    type={element.type}
                  />
                ) : null}
              </div>
            </Link>
          )
        })}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({
  allRecordPlayers: state.allRecordPlayerReducer,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchAllRecordPlayers: () => {
    dispatch(fetchAllRecordPlayers())
  },
  deleteSingleRecordPlayer: id => dispatch(deleteSingleRecordPlayer(id)),
  getCartInfo: id => dispatch(fetchCartInfo(id))
})

export const allRecordPlayers = connect(mapState, mapDispatch)(AllRecordPlayers)
