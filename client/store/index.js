import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

import cartReducer from './cart'

import recordReducer from './record'
import singleRecordReducer from './singleRecord'
import allRecordPlayerReducer from './allRecordPlayers'
import singleRecordPlayerReducer from './singleRecordPlayer'
import allUsersReducer from './allUsers'
import guestReducer from './guestCart'
import confirmationReducer from './confirmationReducer'
import adminReducer from './adminReducer'

const reducer = combineReducers({
  user,
  cartReducer,
  recordReducer,
  singleRecordReducer,
  allRecordPlayerReducer,
  singleRecordPlayerReducer,
  allUsersReducer,
  guestReducer,
  confirmationReducer,
  adminReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
