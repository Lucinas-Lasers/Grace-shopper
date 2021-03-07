import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_RECORDS = 'GET_ALL_RECORDS'
const DELETE_SINGLE_RECORD = 'DELETE_SINGLE_RECORD'

/**
 * INITIAL STATE
 */

const defaultRecords = {loading: true}

/**
 * ACTION CREATORS
 */

export const getAllRecords = records => ({type: GET_ALL_RECORDS, records})
export const deletedSingleRecord = record => ({
  type: DELETE_SINGLE_RECORD,
  record
})

/**
 * THUNK CREATORS
 */

export const fetchAllRecords = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/type/Record')
    dispatch(getAllRecords(data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteSingleRecord = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/products/${id}`)
    history.push('/records')
    dispatch(deletedSingleRecord(data))
  } catch (err) {
    console.log(err)
  }
}
/**
 * REDUCER
 */

export default function(state = defaultRecords, action) {
  switch (action.type) {
    case GET_ALL_RECORDS:
      return {...state, loading: false, records: action.records}
    case DELETE_SINGLE_RECORD:
      return {
        ...state,
        records: state.records.filter(
          element => element.id !== action.record.id
        )
      }
    default:
      return state
  }
}
