/**
 * action 类型
 */
export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TOTO'
export const DELETE_TODO = 'DELETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const UNDO = 'UNDO'
export const REDO = 'REDO'

/**
 * 其他常亮
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const addTodoSync = text => ({ type: ADD_TODO, text })

/**
 * 创建action函数
 */
// export const addTodo = text => ({ type: ADD_TODO, text })
export const addTodo = text => dispatch => {
  setTimeout(() => dispatch(addTodoSync(text)))
}
export const toggleTodo = index => ({ type: TOGGLE_TODO, index })
export const setVisibilityFilter = filter => ({ type: SET_VISIBILITY_FILTER, filter })
export const completeTodo = index => ({ type: COMPLETE_TODO, index })
export const deleteTodo = index => ({ type: DELETE_TODO, index })

export const undo = () => ({type: UNDO})
export const redo = () => ({type: REDO})