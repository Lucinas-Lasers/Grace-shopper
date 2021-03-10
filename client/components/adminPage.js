import React from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  fetchAllUsers,
  fetchAllProducts,
  deleteFromState,
  deleteFromDb
} from '../store/adminReducer'
import EditProduct from './editProduct'

/**
 * COMPONENT
 */
class AdminPage extends React.Component {
  componentDidUpdate(prevprops) {
    if (prevprops.products) {
      if (
        prevprops.products.record.length < this.props.products.record.length
      ) {
        this.props.fetchAllProducts()
      }
    }
  }
  render() {
    return (
      <div className="adminContainer">
        {!this.props.user.admin ? (
          <p>Forbidden</p>
        ) : (
          <div>
            <div className="adminButtonContainer">
              <button type="button" onClick={this.props.fetchAllUsers}>
                Render Users
              </button>
              <button type="button" onClick={this.props.fetchAllProducts}>
                Render Products
              </button>
              {/* <p>Button 3</p> */}
            </div>
            {this.props.adminRender.render === 'users' ? (
              <div className="adminUserItemContainer">
                {this.props.adminRender.users.map(element => (
                  <div key={element.email} className="adminUserItem">
                    <p>
                      Name: {element.firstName} {element.lastName}
                    </p>
                    <p>Email: {element.email}</p>
                    <p>Admin Status: {`${element.admin}`}</p>
                  </div>
                ))}
              </div>
            ) : this.props.adminRender.render === 'products' ? (
              <div>
                <h1>RECORDS</h1>
                <div className="productList">
                  {this.props.adminRender.products.record.map(element => (
                    // <Link key={element.id} to={`/record/${element.id}`}>
                    <div key={element.id} className="productCard">
                      <Link to={`/record/${element.id}`}>
                        <div className="productCardItems">
                          <img src={element.image} />
                          <h2>{element.name}</h2>
                          <p>{element.artist}</p>
                        </div>
                      </Link>
                      <EditProduct
                        deleteItem={this.props.deleteSingleRecord}
                        deleteFromState={this.props.deleteFromState}
                        deleteFromDb={this.props.deleteFromDb}
                        product={element.id}
                        type="record"
                      />
                    </div>
                    // </Link>
                  ))}
                </div>
                <h1>RECORD PLAYERS</h1>
                <div className="productList">
                  {this.props.adminRender.products.recordplayer.map(element => {
                    return (
                      // <Link key={element.id} to={`/recordplayer/${element.id}`}>
                      <div key={element.id} className="productCard">
                        <Link
                          to={`/recordplayer/${element.id}`}
                          className="productCardItems"
                        >
                          <div>
                            <img src={element.image} />
                            <h1>{element.name}</h1>
                          </div>
                        </Link>
                        <EditProduct
                          deleteItem={this.props.deleteSingleRecordPlayer}
                          deleteFromState={this.props.deleteFromState}
                          deleteFromDb={this.props.deleteFromDb}
                          product={element.id}
                          type="record_player"
                        />
                      </div>
                      // </Link>
                    )
                  })}
                </div>
              </div>
            ) : this.props.adminRender.render === 'newProduct' ? (
              <div>new product form</div>
            ) : (
              <h1>Admin dashboard</h1>
            )}
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    adminRender: state.adminReducer,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers()),
  fetchAllProducts: () => dispatch(fetchAllProducts()),
  deleteFromState: (id, type) => dispatch(deleteFromState(id, type)),
  deleteSingleRecord: id => {
    dispatch(deleteSingleRecord(id))
  },
  deleteSingleRecordPlayer: id => {
    dispatch(deleteSingleRecordPlayer(id))
  },
  deleteFromDb: id => {
    dispatch(deleteFromDb(id))
  }
})

export const adminPage = connect(mapState, mapDispatch)(AdminPage)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
