import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_RECORD_PLAYER = 'GET_SINGLE_RECORD_PLAYER'
const EDIT_SINGLE_RECORD_PLAYER = 'EDIT_SINGLE_RECORD_PLAYER'

/**
 * INITIAL STATE
 */

const initialState = {loading: true}

/**
 * ACTION CREATORS
 */

export const getSingleRecordPlayer = recordplayer => ({
  type: GET_SINGLE_RECORD_PLAYER,
  recordplayer
})

export const editedSingleRecordPlayer = recordplayer => ({
  type: EDIT_SINGLE_RECORD_PLAYER,
  recordplayer
})
/*
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

export const editSingleRecordPlayer = (info, history) => {
  return async dispatch => {
    try {
      let {data} = await axios.put(`/api/products/${info.id}`, info)
      dispatch(editedSingleRecordPlayer(data))
      history.push(`/recordplayer/${info.id}`)
    } catch (err) {
      console.log(err)
    }
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
      return {
        ...initialState,
        loading: false,
        recordplayer: action.recordplayer
      }
    case EDIT_SINGLE_RECORD_PLAYER:
      return {
        ...initialState,
        loading: false,
        recordplayer: action.recordplayer
      }
    default:
      return state
  }
}
