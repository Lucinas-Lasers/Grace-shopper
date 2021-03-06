import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Cart,
  allRecords,
  singleRecord,
  allRecordPlayers,
  singleRecordPlayer,
  allUsers,
  allProducts,
  confirmationPage,
  adminPage
} from './components'
import {me} from './store'
import {fetchCartInfo} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/records" component={allRecords} />
        <Route path="/record/:id" component={singleRecord} />
        <Route path="/recordplayers" component={allRecordPlayers} />
        <Route path="/recordplayer/:id" component={singleRecordPlayer} />
        <Route path="/users" component={allUsers} />
        <Route path="/admin" component={adminPage} />
        <Route path="/confirmationpage" component={confirmationPage} />
        <Route path="/home" component={allProducts} />
        {isLoggedIn && this.props.user.admin ? (
          <Switch>
            <Route path="/users" component={allUsers} />
          </Switch>
        ) : (
          <Route component={Login} />
        )}
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    cart: state.cartReducer.cart[0],
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
