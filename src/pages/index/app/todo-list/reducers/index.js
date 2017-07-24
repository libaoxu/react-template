import { VisibilityFilters, DELETE_TODO, SET_VISIBILITY_FILTER, ADD_TODO, COMPLETE_TODO, TOGGLE_TODO } from '../actions'
import undoable from './undoable'
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todoList: [{
    text: '睡觉',
    completed: false
  }]
}

function todoList (state = initialState.todoList, action) {
  // debugger
  switch (action.type) {
    case ADD_TODO: 
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]

    case DELETE_TODO:
      return state.filter((todo, index) => 
        index !== action.index
      )

    case TOGGLE_TODO: 
      return state.map((todo, index) => {
        if (index === action.index) {
          // 不能整一个不纯的, 看到了吧
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo
      })

    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        ...{
          ...state[action.index],
          completed: true
        },
        ...state.slice(action.index + 1)
      ]

    default: 
      return state
  }
}

function visibilityFilter (state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default: 
      return state
  }
}

// export default function totoApp (state = initialState, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todoList: todoList(state.todoList, action)
//   }
// }

export default {
  visibilityFilter,
  todoList: undoable(todoList)
}

// export default function todoApp (state = initialState, action) {
//   console.log(action)
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER: 
//       return Object.assign({}, state, {
//         visibilityFilters: action.filter
//       })

//     case ADD_TODO: 
//     case TOGGLE_TODO: 
//       return Object.assign({}, state, {
//         todoList: todoList(state.todoList, action)
//       })

//     default: 
//       return state
//   }
// }