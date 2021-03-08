import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const initialState = {loading: true, cart: []}

export const getProduct = product => ({type: GET_SINGLE_PRODUCT, product})

export const fetchProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, loading: false, cart: [...state.cart, action.product]}
    default:
      return state
  }
}
