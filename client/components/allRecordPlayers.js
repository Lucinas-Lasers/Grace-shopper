import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchAllRecordPlayers,
  deleteSingleRecordPlayer
} from '../store/allRecordPlayers'
import EditProduct from './editProduct'

class AllRecordPlayers extends React.Component {
  componentDidMount() {
    this.props.fetchAllRecordPlayers()
  }

  render() {
    return !this.props.allRecordPlayers.loading ? (
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
              {this.props.user && this.props.user.admin ? (
                <EditProduct
                  deleteItem={this.props.deleteSingleRecordPlayer}
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
  allRecordPlayers: state.allRecordPlayerReducer,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchAllRecordPlayers: () => {
    dispatch(fetchAllRecordPlayers())
  },
  deleteSingleRecordPlayer: id => dispatch(deleteSingleRecordPlayer(id))
})

export const allRecordPlayers = connect(mapState, mapDispatch)(AllRecordPlayers)
