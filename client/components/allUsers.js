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
      <div id="user-info">
        <h3>Laser Records Users</h3>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
            {this.props.allUsers.map((element, idx) => {
              return (
                <tr key={idx}>
                  <td>{element.firstName}</td>
                  <td>{element.lastName}</td>
                  <td>{element.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
