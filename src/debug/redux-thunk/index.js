function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => {
    return (next, thunkNext) => {
      return action => {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument, 'thunkAction');
        }
        // debugger
        return next(action, 'thunkAction');
      }
    }
  }
  // return ({ dispatch, getState }) => {
  //   return next => {
  //     return action => {
  //       if (typeof action === 'function') {
  //         return action(dispatch, getState, extraArgument);
  //       }

  //       return next(action);
  //     }
  //   }
  // }
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

// export const logger = ({ dispatch, getState }) => next => action => next(action)
export const logger = ({ dispatch, getState }) => {
  return (next, loggerNext) => {
    // debugger
    return  (action, loggerAction) => {
      // debugger
      return next(action, 'loggerAction')
    }
  }
}