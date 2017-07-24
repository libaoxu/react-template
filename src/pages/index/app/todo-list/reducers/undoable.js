export default function undoable (reducer) {
  // 一个空的 action 调用 reducer 来产生初始的state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  return function (state = initialState, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }

      default: 
        // 将其他的action 委托给原始的 reducer 处理
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }

        return {
          past: [...past, present],
          present: newPresent,
          future: []
        }
    }
  }
}