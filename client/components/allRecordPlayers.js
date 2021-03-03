import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllRecords} from '../store/record'

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

class AllRecords extends React.Component {
  componentDidMount() {
    this.props.fetchAllRecords()
    //disptach thunk to bring data from ./api/allRecords
  }

  render() {
    return this.props.allRecords[0] ? (
      <div className="albumList">
        {this.props.allRecords.map(element => {
          return (
            <div key={element.id} className="album">
              <img src={element.image} />
              <h1>{element.name}</h1>
              <h1>{element.artist}</h1>
            </div>
          )
        })}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({allRecords: state.recordReducer})

const mapDispatch = dispatch => ({
  fetchAllRecords: () => {
    dispatch(fetchAllRecords())
  }
})

export const allRecords = connect(mapState, mapDispatch)(AllRecords)
