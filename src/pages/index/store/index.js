import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import todomvcReducers from '../app/todomvc/reducers'
import shoppingCartReducers from '../app/shopping-cart/reducers'
import todoListReducers from '../app/todo-list/reducers'

import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger());
}

const rootReducer = combineReducers({
  ...todomvcReducers,
  ...shoppingCartReducers,
  ...todoListReducers
})

const __store__ = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

window.__store__ = __store__

export default __store__