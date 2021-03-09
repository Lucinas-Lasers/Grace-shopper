import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_CONFIRMED_CHECKOUT = 'SET_CONFIRMED_CHECKOUT'
const UNLOAD = 'UNLOAD'

/**
 * INITIAL STATE
 */

const initialState = {loadConfirmation: false, confirmCart: []}

/**
 * ACTION CREATORS
 */

export const setConfirmedProducts = confirmedProducts => {
  confirmedProducts = confirmedProducts.map(element => {
    return {
      product: element,
      price: (element['product-order'].price / 1000).toFixed(2),
      qty: element['product-order'].qty
    }
  })
  console.log('confirmedProducts', confirmedProducts)

  history.push('/confirmationpage')
  return {
    type: SET_CONFIRMED_CHECKOUT,
    confirmedProducts
  }
}

export const unload = () => ({type: UNLOAD, boolean: false})

/**
 * THUNK CREATORS
 */

// export const fetchAllUsers = () => async (dispatch) => {
//   try {
//     const {data} = await axios.get(`/api/admin`)
//     dispatch(getAllUsers(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */

export default function all(state = initialState, action) {
  switch (action.type) {
    case SET_CONFIRMED_CHECKOUT:
      return {
        ...state,
        loadConfirmation: true,
        confirmCart: action.confirmedProducts
      }
    case UNLOAD:
      return {
        ...state,
        loadConfirmation: action.boolean
      }
    default:
      return state
  }
}
