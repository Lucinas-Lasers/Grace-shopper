import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_RECORDPLAYERS = 'GET_ALL_RECORDPLAYERS'

/**
 * INITIAL STATE
 */

const initialState = []

/**
 * ACTION CREATORS
 */

export const getAllRecordPlayer = recordplayers => ({
  type: GET_ALL_RECORDPLAYERS,
  recordplayers
})

/**
 * THUNK CREATORS
 */

export const fetchAllRecordPlayers = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/type/Record Player`)
    dispatch(getAllRecordPlayer(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function allRecordPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECORDPLAYERS:
      return action.recordplayers
    default:
      return state
  }
}
