import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_RECORDPLAYERS = 'GET_ALL_RECORDPLAYERS'
const DELETE_SINGLE_RECORD_PLAYER = 'DELETE_SINGLE_RECORD_PLAYER'
/**
 * INITIAL STATE
 */

const initialState = {loading: true}

/**
 * ACTION CREATORS
 */

export const getAllRecordPlayer = recordplayers => ({
  type: GET_ALL_RECORDPLAYERS,
  recordplayers
})

export const deletedSingleRecordPlayer = recordplayer => ({
  type: DELETE_SINGLE_RECORD_PLAYER,
  recordplayer
})

/**
 * THUNK CREATORS
 */

export const fetchAllRecordPlayers = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/type/Record_Player`)
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
      return {...state, loading: false, recordplayers: action.recordplayers}
    case DELETE_SINGLE_RECORD_PLAYER:
      return {
        ...state,
        recordplayers: state.recordplayers.filter(
          element => element.id !== action.recordplayer.id
        )
      }
    default:
      return state
  }
}
