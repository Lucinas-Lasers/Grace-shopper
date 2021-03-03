import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART_INFO = 'GET_CART_INFO'

/**
 * INITIAL STATE
 */

const initialState = []

/**
 * ACTION CREATORS
 */

export const getCartInfo = products => ({type: GET_CART_INFO, products})

/**
 * THUNK CREATORS
 */

export const fetchCartInfo = id => async dispatch => {
  try {
    console.log('id', id)
    const {data} = await axios.get('/api/cart', id)
    dispatch(getCartInfo(data))
  } catch (err) {
    console.error(err)
  }
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case GET_CART_INFO:
      return action.products
    default:
      return state
  }
}
/**
 * REDUCER  --- 3/2 needs to be done for fetch records
 */

//  export default function (state =defaultRecords, action){
//      switch (action.type){
//      case XXX :  return state,

//      default: return state

//      }
//     }