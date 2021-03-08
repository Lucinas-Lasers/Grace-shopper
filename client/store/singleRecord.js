import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_RECORD = 'GET_SINGLE_RECORD'
const EDIT_SINGLE_RECORD = 'EDIT_SINGLE_RECORD'

/**
 * INITIAL STATE
 */

const initialState = {loading: true}

/**
 * ACTION CREATORS
 */

export const getSingleRecord = record => ({type: GET_SINGLE_RECORD, record})

export const editedSingleRecord = record => ({
  type: EDIT_SINGLE_RECORD,
  record
})

/**
 * THUNK CREATORS
 */

export const fetchSingleRecord = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    if (data.type === 'Record_Player') {
      history.push(`/recordplayer/${id}`)
    }
    dispatch(getSingleRecord(data))
  } catch (err) {
    console.error(err)
  }
}

export const editSingleRecord = info => {
  return async dispatch => {
    try {
      let {data} = await axios.put(`/api/products/${info.id}`, info)
      dispatch(editedSingleRecord(data))
      history.push(`/record/${info.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_RECORD:
      return {...state, loading: false, record: action.record}
    case EDIT_SINGLE_RECORD:
      return {
        ...initialState,
        record: state.record.map(
          element => (element.id === action.record.id ? action.record : element)
        )
      }
    default:
      return state
  }
}
