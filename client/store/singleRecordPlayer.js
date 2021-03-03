import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_RECORD_PLAYER = 'GET_SINGLE_RECORD_PLAYER'

/**
 * INITIAL STATE
 */

const initialState = {}

/**
 * ACTION CREATORS
 */

export const getSingleRecordPlayer = recordplayer => ({
  type: GET_SINGLE_RECORD_PLAYER,
  recordplayer
})

/**
 * THUNK CREATORS
 */

export const fetchSingleRecordPlayer = (id, history) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    if (data.type === 'Record') {
      history.push(`/record/${id}`)
    }
    dispatch(getSingleRecordPlayer(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function singleRecordPlayerReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case GET_SINGLE_RECORD_PLAYER:
      return action.recordplayer
    default:
      return state
  }
}
