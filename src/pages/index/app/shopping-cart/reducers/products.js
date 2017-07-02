import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../constants/ActionTypes'

const products = (state, action) => {
  console.log('products state: ', state)
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  // console.log('byId state: ', state)
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
    default:
      const { productId } = action
      if (productId) {
        debugger
        return {
          ...state,
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}

// console.log(combineReducers({
//   byId,
//   visibleIds
// }))

export default combineReducers({
  byId,
  visibleIds
})

export const getProduct = (state, id) =>
  state.byId[id]

export const getVisibleProducts = state => {
  // debugger
  return state.visibleIds.map(id => getProduct(state, id))
}
