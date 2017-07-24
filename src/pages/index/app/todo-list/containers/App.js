import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, toggleTodo, deleteTodo, setVisibilityFilter, VisibilityFilters, undo, redo } from '../actions'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer'
import UndoRedo from './UndoRedo'
import { visibleTodosSelector } from '../selectors/todoSelector'

class App extends Component {
  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, bindAddTodo, visibilityFilter } = this.props
    // console.log(dispatch, bindAddTodo)
    return (
      <div>
        <AddTodo
          onAddClick={text => 
            dispatch(addTodo(text))
            // bindAddTodo(text)
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(toggleTodo(index))
          } 
          onDeleteTodo={index => 
            dispatch(deleteTodo(index))
          }/>
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
        
        <UndoRedo 
          onUndo={() => dispatch(undo())}
          onRedo={() => dispatch(redo())}
          />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

// function selectTodos(todos, filter) {
//   switch (filter) {
//     case VisibilityFilters.SHOW_ALL:
//       return todos
//     case VisibilityFilters.SHOW_COMPLETED:
//       return todos.filter(todo => todo.completed)
//     case VisibilityFilters.SHOW_ACTIVE:
//       return todos.filter(todo => !todo.completed)
//   }
// }

// // Which props do we want to inject, given the global state?
// // Note: use https://github.com/faassen/reselect for better performance.
// function mapStateToProps(state) {
//   return {
//     visibleTodos: selectTodos(state.todoList, state.visibilityFilter),
//     visibilityFilter: state.visibilityFilter
//   }
// }

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(visibleTodosSelector /*, { bindAddTodo: addTodo }*/)(App)