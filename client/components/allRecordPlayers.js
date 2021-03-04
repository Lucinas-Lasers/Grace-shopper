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
    console.log(this.props)
  }

  render() {
    return this.props.allRecordPlayers[0] ? (
      <div className="albumList">
        {this.props.allRecordPlayers.map(element => {
          return (
            <div key={element.id} className="album">
              <img src={element.image} />
              <h1>{element.name}</h1>
              <EditProduct
                deleteItem={this.props.deleteSingleRecordPlayer}
                product={element.id}
              />
            </div>
          )
        })}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({allRecordPlayers: state.allRecordPlayerReducer})

const mapDispatch = dispatch => ({
  fetchAllRecordPlayers: () => {
    dispatch(fetchAllRecordPlayers())
  },
  deleteSingleRecordPlayer: id => dispatch(deleteSingleRecordPlayer(id))
})

export const allRecordPlayers = connect(mapState, mapDispatch)(AllRecordPlayers)
