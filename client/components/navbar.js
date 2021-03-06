import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <div className="navbarContainerLeft">
      <Link to="/home">
        <div className="logoContainer">
          <h3>Laser</h3>
          <img className="logo" src="../logo.jpg" />
          <h3>Records</h3>
        </div>
      </Link>
      <div className="navbarProducts">
        <p>
          Products
          <div className="productItems">
            <Link to="/allRecords">
              <div className="productOption">Albums</div>
            </Link>
            <Link to="/recordplayers">
              <div className="productOption">Record Players</div>
            </Link>
          </div>
        </p>
      </div>
    </div>

    {isLoggedIn ? (
      <div>
        <div className="navbarLogin">
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick} className="navbarButton">
            Logout
          </a>
          <Link to="/cart">
            <div className="navbarButton">Cart</div>
          </Link>
        </div>
      </div>
    ) : (
      <div className="navbarLogin">
        {/* The navbar will show these links before you log in */}
        <Link to="/login">
          <div className="navbarButton">Login</div>
        </Link>
        <Link to="/signup">
          <div className="navbarButton">Sign Up</div>
        </Link>
        <Link to="/cart">
          <div className="navbarButton">Cart</div>
        </Link>
      </div>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
