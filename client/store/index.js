import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

import cart from './cart'

import recordReducer from './record'
import singleRecordReducer from './singleRecord'
import allRecordPlayerReducer from './allRecordPlayers'
import singleRecordPlayerReducer from './singleRecordPlayer'
import allUsersReducer from './allUsers'

const reducer = combineReducers({
  user,
  cart,
  recordReducer,
  singleRecordReducer,
  allRecordPlayerReducer,
  singleRecordPlayerReducer,
  allUsersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
