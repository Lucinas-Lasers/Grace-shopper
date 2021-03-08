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
        <div className="productButton">
          <p>Products</p>
        </div>
        <div className="productItems">
          <Link to="/records">
            <div className="productOption">Albums</div>
          </Link>
          <Link to="/recordplayers">
            <div className="productOption">Record Players</div>
          </Link>
        </div>
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
            <div className="navbarButton">
              <svg className="svg-icon" viewBox="0 0 20 20">
                <path
                  fill="none"
                  d="M17.696,9.368H2.305c-0.189,0-0.367,0.092-0.478,0.245c-0.11,0.155-0.141,0.352-0.08,0.532l2.334,6.918c0.081,0.238,0.305,0.4,0.556,0.4h10.735c0.253,0,0.478-0.162,0.557-0.402l2.323-6.917c0.062-0.179,0.03-0.376-0.079-0.531C18.062,9.459,17.886,9.368,17.696,9.368z M14.95,16.287H5.062l-1.938-5.743h13.753L14.95,16.287z"
                />
                <path
                  fill="none"
                  d="M6.345,7.369c0.325,0,0.588-0.263,0.588-0.588c0-1.691,1.376-3.067,3.067-3.067c1.691,0,3.067,1.376,3.067,3.067c0,0.325,0.264,0.588,0.588,0.588c0.326,0,0.589-0.263,0.589-0.588c0-2.34-1.904-4.243-4.244-4.243c-2.34,0-4.244,1.903-4.244,4.243C5.757,7.106,6.02,7.369,6.345,7.369z"
                />
              </svg>
              Cart
            </div>
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
          <div className="navbarButton">
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path
                fill="none"
                d="M17.696,9.368H2.305c-0.189,0-0.367,0.092-0.478,0.245c-0.11,0.155-0.141,0.352-0.08,0.532l2.334,6.918c0.081,0.238,0.305,0.4,0.556,0.4h10.735c0.253,0,0.478-0.162,0.557-0.402l2.323-6.917c0.062-0.179,0.03-0.376-0.079-0.531C18.062,9.459,17.886,9.368,17.696,9.368z M14.95,16.287H5.062l-1.938-5.743h13.753L14.95,16.287z"
              />
              <path
                fill="none"
                d="M6.345,7.369c0.325,0,0.588-0.263,0.588-0.588c0-1.691,1.376-3.067,3.067-3.067c1.691,0,3.067,1.376,3.067,3.067c0,0.325,0.264,0.588,0.588,0.588c0.326,0,0.589-0.263,0.589-0.588c0-2.34-1.904-4.243-4.244-4.243c-2.34,0-4.244,1.903-4.244,4.243C5.757,7.106,6.02,7.369,6.345,7.369z"
              />
            </svg>
            Cart
          </div>
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
