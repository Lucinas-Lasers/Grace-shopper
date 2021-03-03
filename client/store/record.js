import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_RECORDS = 'GET_ALL_RECORDS'

/**
 * INITIAL STATE
 */

const defaultRecords = []

/**
 * ACTION CREATORS
 */

export const getAllRecords = records => ({type: GET_ALL_RECORDS, records})

/**
 * THUNK CREATORS
 */

export const fetchAllRecords = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/records')
    dispatch(getAllRecords(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultRecords, action) {
  switch (action.type) {
    case GET_ALL_RECORDS:
      return action.records

    default:
      return state
  }
}
