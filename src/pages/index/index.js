import entry from 'entry'
import React from 'react'
import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import store from './store'
import routes from './routes'

entry(
  <Provider store={store}>
    <Router history={hashHistory}>
      { routes }
    </Router>
  </Provider>
)
