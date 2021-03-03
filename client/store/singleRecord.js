import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_RECORD = 'GET_SINGLE_RECORD'

/**
 * INITIAL STATE
 */

const defaultRecords = {}

/**
 * ACTION CREATORS
 */

export const getSingleRecord = record => ({type: GET_SINGLE_RECORD, record})

/**
 * THUNK CREATORS
 */

export const fetchSingleRecord = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getSingleRecord(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultRecords, action) {
  switch (action.type) {
    case GET_SINGLE_RECORD:
      return action.record
    default:
      return state
  }
}
