import entry from 'entry'
import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import App from './components/App'
import './index.less'
import Button from 'antd-mobile/lib/button'
import { NavBar } from 'antd-mobile'
console.log(Button, NavBar)
// class App extends React.Component {
//   constructor (props) {
//     super(props)
//   }

//   render () {
//     return (
//       <div>
//         {this.props.children}
//       </div>
//     )
//   }
// }

class Index extends React.Component {
  render () {
    return (
      <div className="body">
        <h1>Stages list</h1>
        <ul role="nav">
          <li><Link to="/s1">ListView + Carousel</Link></li>
          <li><Link to="/s2">Tabs + ...</Link></li>
          <li><Link to="/s3">Form + ...</Link></li>
        </ul>
      </div>
    )
  }
}

class Stage1 extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        Stage1
      </div>
    )
  }
}
class Stage2 extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        Stage2
      </div>
    )
  }
}
class Stage3 extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        Stage3
      </div>
    )
  }
}

entry(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="s1" component={Stage1} />
      <Route path="s2" component={Stage2} />
      <Route path="s3" component={Stage3} />
    </Route>
  </Router>
) 



