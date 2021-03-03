import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// Reducer
import {fetchSingleRecordPlayer} from '../store/singleRecordPlayer'

/*
1. this page display all product
2. this page will display data from .api/allRecords
3. this page will thunk will dispatch the axios call to ./api/allRecords to fetch data
4. redux store will provide state for all records to


state {
    allproducts
    all records
    all player
    selected records
    selected player
    carts
    currentUser
    allUsers

}

*/

class SingleRecordPlayer extends React.Component {
  componentDidMount() {
    this.props.fetchSingleRecordPlayer(this.props.match.params.id)
    //disptach thunk to bring data from ./api/allRecords
  }

  render() {
    const record = this.props.singleRecordPlayer
    return record.id ? (
      <div className="singleRecord">
        {
          <div key={record.id} className="singleAlbum">
            <img src={record.image} />
            <h1>{record.name}</h1>
          </div>
        }
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({
  singleRecordPlayer: state.singleRecordPlayerReducer
})

const mapDispatch = (dispatch, {history}) => ({
  fetchSingleRecordPlayer: id => {
    dispatch(fetchSingleRecordPlayer(id, history))
  }
})

export const singleRecordPlayer = connect(mapState, mapDispatch)(
  SingleRecordPlayer
)
