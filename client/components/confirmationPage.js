import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {fetchCartInfo} from '../store/cart'

export const confirmationPageRender = props => {
  console.log(props)
  return props.confirmationInformation.loadConfirmation ? (
    <div className="confirmationContainer">
      <h2>You bought:</h2>
      {props.confirmationInformation.confirmCart.map(element => {
        return (
          <div className="confirmationItem" key={element.product.id}>
            <img src={element.product.image} />
            <div className="confirmationRightContainer">
              <h1>{element.product.name}</h1>
              <h2>By: {element.product.artist}</h2>
              <p>Album Price: ${(element.product.price / 1000).toFixed(2)}</p>
              <p>Quantity: {element.qty}</p>
              <p>Total: ${element.price}</p>
            </div>
          </div>
        )
      })}
      <h4>
        Overall Total: $
        {props.confirmationInformation.confirmCart.reduce(
          (accumulator, currentVal) => {
            console.log(currentVal)
            currentVal = parseFloat(currentVal.price * 1000)
            return (accumulator + currentVal) / 1000
          },
          0
        )}
      </h4>
      <Link to="/home">Return Home</Link>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

// class ConfirmationPage extends React.Component {
//   // componentDidMount() {}

//   render() {
//     return false ? (
//       <div className="confirmationContainer">
//         <Link to='/home'>Return Home</Link>
//       </div>
//     ) : (
//       <div>Loading...</div>
//     )
//   }
// }

const mapState = state => ({
  confirmationInformation: state.confirmationReducer
})

// const mapDispatch = (dispatch) => ({
//   fetchAllRecords: () => {
//     dispatch(fetchAllRecords())
//   },
// })

export const confirmationPage = connect(mapState)(confirmationPageRender)
