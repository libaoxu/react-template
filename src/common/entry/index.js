import 'common/less/base'

import ReactDOM from 'react-dom'

// 异步绑定fastclick
require.ensure([], function (require) {
  require('fastclick').attach(document.body)
})

export default (App, Opts) => {
  ReactDOM.render(App, document.getElementById('app'))
}