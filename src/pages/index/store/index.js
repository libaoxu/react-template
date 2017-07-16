import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import todomvcReducers from '../app/todomvc/reducers'
import shoppingCartReducers from '../app/shopping-cart/reducers'
import todoListReducers from '../app/todo-list/reducers'

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { logger } from 'redux-thunk'

const middlewareList = [  thunkMiddleware ];

if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(createLogger())
}

const rootReducer = combineReducers({
  ...todomvcReducers,
  ...shoppingCartReducers,
  ...todoListReducers
})
// console.log(createStore(
//   rootReducer,
//   composeWithDevTools(
//     applyMiddleware(...middlewareList)
//   )
//   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))
export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewareList)
  )
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)