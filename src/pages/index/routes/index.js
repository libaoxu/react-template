import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

import App from '../app/index'

export default <Route path="/" component={App}>
  <IndexRoute component={require('../app/home').default} onEnter={function (nextState, replaceState, callback) {
    // console.log(this)
    callback()
  }}/>
  <Route path="s1" getComponent={(location, callback) => {
    // console.log(location)
    require.ensure([], function (require) {
      callback(null, require('../app/components/Stage1').default)
    }, 'stage1')
  }} />
  
  // getComponent 和 getComponents 都差不多
  <Route path="s2" getComponents={(location, callback) => {
    require.ensure([], function (require) {
      callback(null, require('../app/components/Stage2').default)
    }, 'stage2')
  }} />
  <Route path="s3" getComponent={(location, callback) => {
    require.ensure([], function (require) {
      callback(null, require('../app/components/Stage3').default)
    }, 'stage3')
  }}/>
  <Route path="todomvc" getComponents={(location, callback) => {
    require.ensure([], function (require) {
      callback(null, require('../app/todomvc').default)
    }, 'todomvc')
  }}
  ></Route>

  <Route path="todo-list" getComponents={(location, callback) => {
    require.ensure([], function (require) {
      callback(null, require('../app/todo-list').default)
    }, 'todo-list')
  }}
  ></Route>

  <Route path="shopping-cart" getComponents={(location, callback) => {
    require.ensure([], function (require) {
      callback(null, require('../app/shopping-cart').default)
    }, 'shopping-cart')
  }}
  ></Route>
</Route>