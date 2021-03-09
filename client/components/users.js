import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllUsers} from '../store/allUsers'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    return this.props.user &&
      this.props.user.admin &&
      this.props.allUsers[0] ? (
      <div className="albumList">
        {this.props.allUsers.map(element => {
          return (
            <div key={element.id} className="album">
              <h1>{element.firstName}</h1>
              <h1>{element.lastName}</h1>
            </div>
          )
        })}
      </div>
    ) : (
      <div>ERROR! Unauthorized Access. Go back to Grace Hopper Mac</div>
    )
  }
}

const mapState = state => ({
  allUsers: state.allUsersReducer,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchAllUsers: () => {
    dispatch(fetchAllUsers())
  }
})

export const allUsers = connect(mapState, mapDispatch)(AllUsers)
