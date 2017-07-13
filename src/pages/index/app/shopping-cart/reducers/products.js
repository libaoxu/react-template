import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART, DECREASE_FROM_CART } from '../constants/ActionTypes'

const initialState = {
  byId: {},
  visibleIds: []
}

const productHandler = (state, action) => {
  // console.log('products state: ', state, action)
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }

    case DECREASE_FROM_CART: 
      return {
        ...state,
        inventory: state.inventory + 1
      }
    default:
      return state
  }
}

// byId 最开始只是一个 {}
const byId = (state = initialState.byId, action) => {
  // console.log('byId state: ', state, action)
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      // 这不是一个数组, 是一个json对象, 类数组
      // console.log(action.products.reduce((obj, product) => {
      //     obj[product.id] = product
      //     return obj
      //   }, {}))
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
    
    case ADD_TO_CART:
    case DECREASE_FROM_CART:
      const { productId } = action
      if (productId) {
        return {
          ...state,
          [productId]: productHandler(state[productId], action)
        }
      }

      return state

    default:
      return state
  }
}

const visibleIds = (state = initialState.visibleIds, action) => {
  // console.log('visibleIds state: ', state, action)
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      // debugger
      return action.products.map(product => product.id)
    default:
      return state
  }
}

// console.log(combineReducers({
//   byId,
//   visibleIds
// }))

export default function productsReducer (state = initialState, action) {
  switch (action.type) {
    default: 
      return combineReducers({
        byId,
        visibleIds
      })(state, action)
  }
}

// export default function productsReducer (state = {}, action) {
//   console.log('products combineReducers: ', state, action)
//   return { 
//     byId: byId(state.byId, action),
//     visibleIds: visibleIds(state.visibleIds, action)
//   }
// }

export const getProduct = (state, id) =>
  state.byId[id]

// 调用getVisibleProducts 这个函数传入的 state 最完美就是只 当前的 products, 即: rootState.products
export const getVisibleProducts = state => {
  // debugger
  return state.visibleIds.map(id => getProduct(state, id))
}
