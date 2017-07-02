import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'

import './index.less'
// import { getAllProducts } from './actions'
// import reducer from './reducers'
// import { createStore, applyMiddleware } from 'redux'
// import { createLogger } from 'redux-logger'
// import thunk from 'redux-thunk'
// const middleware = [ thunk ];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }

// const store = createStore(
//   reducer,
//   applyMiddleware(...middleware)
// )

// store.dispatch(getAllProducts())

export default App
// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )
