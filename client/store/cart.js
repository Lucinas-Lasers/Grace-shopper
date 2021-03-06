import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART_INFO = 'GET_CART_INFO'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_TO_CART = 'UPDATE_TO_CART'
const BUY_CART_ITEM = 'BUY_CART_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CART_LOADING = 'CART_LOADING'
/**
 * INITIAL STATE
 */

const initialState = {loading: true, cart: []}

/**
 * ACTION CREATORS
 */

export const getCartInfo = products => ({type: GET_CART_INFO, products})
export const addedToCart = item => ({
  type: ADD_TO_CART,
  item
})
export const updatedToCart = item => ({
  type: UPDATE_TO_CART,
  item
})

export const boughtCartItem = item => ({
  type: BUY_CART_ITEM,
  item
})

export const removedItem = item => ({
  type: REMOVE_ITEM,
  item
})

export const userCartLoading = () => ({
  type: CART_LOADING
})

/**
 * THUNK CREATORS
 */

export const fetchCartInfo = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/order/user/${id}`)
    dispatch(getCartInfo(data))
  } catch (err) {
    console.error(err)
  }
}

export const addingToCart = id => async dispatch => {
  try {
    let orderId = id.orderId
    const {data} = await axios.put(`/api/order/${orderId}`, id)
    history.push(`/record/${id.productId}`)
    dispatch(addedToCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateToCart = id => async dispatch => {
  try {
    let orderId = id.orderId || id.id
    const {data} = await axios.put(`/api/order/${orderId}`, id)
    dispatch(updatedToCart(data))
    // let home = history.location.pathname
    // history.push(home)
    // console.log(home)
  } catch (err) {
    console.log(err)
  }
}

export const buyCartItem = id => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`api/order/product/${id.id}`, id)
      dispatch(boughtCartItem(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const orderFulfilled = id => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`api/order/submit/${id.orderId}`, id)
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeItem = id => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`api/order/remove/${id.orderId}`, id)
      dispatch(removedItem(data))
      history.push('/cart')
    } catch (err) {
      console.log(err)
    }
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_LOADING:
      return {...state, loading: true}
    case GET_CART_INFO:
      return {...state, loading: false, cart: action.products}
    case ADD_TO_CART:
      state.cart[0].products = [...state.cart[0].products, action.item]
      return {...state, cart: state.cart}
    case UPDATE_TO_CART:
      state.cart[0].products = state.cart[0].products.map(product => {
        if (product.id === action.item.id) {
          return action.item
        }
      })
      return {
        ...state,
        cart: state.cart
      }
    case BUY_CART_ITEM:
      state.cart[0].products = state.cart[0].products.filter(product => {
        return product.id !== action.item.id
      })
      return {
        ...state,
        cart: state.cart
      }
    case REMOVE_ITEM:
      state.cart[0].products = state.cart[0].products.filter(product => {
        return product.id !== action.item.productId
      })
      return {
        ...state,
        cart: state.cart
      }
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
