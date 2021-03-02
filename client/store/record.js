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
 * REDUCER  --- 3/2 needs to be done for fetch records
 */

//  export default function (state =defaultRecords, action){
//      switch (action.type){
//      case XXX :  return state,

//      default: return state

//      }
//     }
