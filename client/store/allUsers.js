import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * INITIAL STATE
 */

const initialState = []

/**
 * ACTION CREATORS
 */

export const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
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

/**
 * REDUCER
 */

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
