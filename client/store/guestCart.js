import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const SET_LOADING = 'SET_LOADING'

const initialState = {loading: true, cart: []}

export const getProduct = product => ({type: GET_SINGLE_PRODUCT, product})

export const resetLoading = () => ({type: SET_LOADING})

export const fetchProduct = localStorage => async dispatch => {
  try {
    const productArray = localStorage.map(async element => {
      const {data} = await axios.get(`/api/products/${element[0]}`)
      return {data, qty: element[1].qty}
    })
    Promise.all(productArray).then(value => dispatch(getProduct(value)))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, loading: false, cart: action.product}
    case SET_LOADING:
      return {...state, loading: true}
    default:
      return state
  }
}
