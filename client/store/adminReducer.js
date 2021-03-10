import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADMIN_USERS = 'ADMIN_USERS'
const ADMIN_PRODUCTS = 'ADMIN_PRODUCTS'
const ADMIN_DELETE_FROM_STATE = 'ADMIN_DELETE_FROM_STATE'
const ADMIN_DELETE_FROM_DB = 'ADMIN_DELETE_FROM_DB'

/**
 * INITIAL STATE
 */

const initialState = {render: '', users: [], products: {}}

/**
 * ACTION CREATORS
 */

export const getAllUsers = users => ({
  type: ADMIN_USERS,
  render: 'users',
  users
})

export const getAllProducts = products => ({
  type: ADMIN_PRODUCTS,
  render: 'products',
  products
})

export const deleteFromState = (id, productType) => ({
  type: ADMIN_DELETE_FROM_STATE,
  id,
  productType
})

/**
 * THUNK CREATORS
 */

export const fetchAllUsers = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/admin`)
    dispatch(getAllUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllProducts = () => async dispatch => {
  try {
    const records = await axios.get(`/api/products/type/Record`)
    const recordPlayers = await axios.get(`/api/products/type/Record_Player`)

    const data = {record: records.data, recordplayer: recordPlayers.data}
    dispatch(getAllProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteFromDb = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
  } catch (err) {
    console.err(err)
  }
}

/**
 * REDUCER
 */

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_USERS:
      return {...state, users: action.users, render: action.render}
    case ADMIN_PRODUCTS:
      return {...state, products: action.products, render: action.render}
    case ADMIN_DELETE_FROM_STATE:
      state.products[action.productType] = state.products[
        action.productType
      ].filter(element => element.id !== action.id)
      return {...state}
    default:
      return state
  }
}
