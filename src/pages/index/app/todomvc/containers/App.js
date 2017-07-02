import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'
// const App = ({todos, actions}) => (
//   <div className="todo-mvc-wrapper">
//     <div className="todoapp">
//       <Header addTodo={actions.addTodo} />
//       <MainSection todos={todos} actions={actions} />
//     </div>
//   </div>
// )

class App extends React.Component {
  render () {
    const { todos, actions, dispatch } = this.props
    console.log('如果是bindActionCreators之后 props里面没有dispatch: ', dispatch)
    return <div className="todo-mvc-wrapper">
      <div className="todoapp">
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    </div>
  }
}


App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  // 又是一个牛叉货
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
