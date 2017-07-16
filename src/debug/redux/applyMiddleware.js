import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => { 
        return dispatch(action)
      }
    }
    
    // middlewareAPI
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 这是一个新的 dispatch了, 是middlewareAPI中的dispatch 的一个封装, 其中包含各种middlewares, 
    // 所有的 middlewares 经过 compose 进行一层层的过滤 f(g(h(...args)))
    // args -> store.dispatch -> next
    dispatch = compose(...chain)(store.dispatch, 'applyMiddleware next')

    return {
      ...store,
      dispatch
    }
  }
}
