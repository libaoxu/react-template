import { createSelector } from 'reselect'
import { VisibilityFilters } from '../actions'

function selectTodos(todos, filter) {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed)
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed)
  }
}

const visibilityFilterSelector = (state) => state.visibilityFilter
const todosSelector = (state) => state.todoList

export const visibleTodosSelector = createSelector(
  [visibilityFilterSelector, todosSelector],
  (visibilityFilter, todoList) => {
    const { past, present, future } = todoList
    return {
      undoDisabled: past.length === 0,
      redoDisabled: future.length === 0,
      visibleTodos: selectTodos(present, visibilityFilter),
      visibilityFilter
    }
  }
)

// console.log(visibleTodosSelector)