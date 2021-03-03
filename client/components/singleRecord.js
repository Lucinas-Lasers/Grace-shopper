import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// Reducer
import {fetchSingleRecord} from '../store/singleRecord'

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

class SingleRecord extends React.Component {
  componentDidMount() {
    this.props.fetchSingleRecord(this.props.match.params.id)
    //disptach thunk to bring data from ./api/allRecords
  }

  render() {
    const record = this.props.singleRecord
    return record.id ? (
      <div>
        {
          <div key={record.id} className="albumList">
            <img src={record.image} />
            <div className="album">
              <h1>{record.name}</h1>
              <h1>{record.artist}</h1>
              <p>{record.description}</p>
              <p>{record.price}</p>
              {record.tracks.map((track, ind) => {
                return <div key={ind}> {track}</div>
              })}
            </div>
          </div>
        }
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({singleRecord: state.singleRecordReducer})

const mapDispatch = dispatch => ({
  fetchSingleRecord: id => {
    dispatch(fetchSingleRecord(id))
  }
})

export const singleRecord = connect(mapState, mapDispatch)(SingleRecord)
