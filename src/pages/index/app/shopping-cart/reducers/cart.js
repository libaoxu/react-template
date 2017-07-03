import { combineReducers } from 'redux'
import {
  ADD_TO_CART,
  DECREASE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = function (state = initialState.addedIds, action) {
  // console.log('addedIds state: ', state)
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    
    // 从购物车移除
    case DECREASE_FROM_CART:
      const { productId } = action
      // 如果不为0返回, 如果为0 就过滤掉
      if (getQuantity({
        // 纯函数, 可以执行多次, 我们获取一下cart 中最新的quantityById
        quantityById: quantityById(action.cart.quantityById, action)
      }, productId) > 0) {
        return state
      }

      // 没有数量了, 直接从中干掉
      return state.filter(id => (id !== productId))

    // 如果是第二种 export default combineReducers({   quantityById, addedIds })情况
    case CHECKOUT_REQUEST:
      return initialState.addedIds
    case CHECKOUT_FAILURE:
      return action.cart.addedIds
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  // console.log('quantityById state: ', action.cart, state)
  switch (action.type) {
    case ADD_TO_CART:
      var { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }

    case DECREASE_FROM_CART:
      var { productId } = action
      return { ...state,
        [productId]: (state[productId] || 1) - 1
      }

    // 如果是第二种 export default combineReducers({   quantityById, addedIds })情况
    case CHECKOUT_REQUEST:
      return initialState.quantityById
    case CHECKOUT_FAILURE:
      return action.cart.quantityById
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

// const cart = (state = initialState , action) => {
//   // console.log('cart: ', state, action)
//   switch (action.type) {
//     // 成功失败这个是公用的情况
//     case CHECKOUT_REQUEST:
//       return initialState
//     case CHECKOUT_FAILURE:
//       return action.cart
//     default:
//       // return {
//       //   addedIds: addedIds(state.addedIds, action),
//       //   quantityById: quantityById(state.quantityById, action)
//       // }
//       return combineReducers({
//         quantityById,
//         addedIds
//       })(state, action)
//   }
// }


// export default cart
export default combineReducers({
  quantityById,
  addedIds
})
