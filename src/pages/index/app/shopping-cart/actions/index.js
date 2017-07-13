import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

// 异步的 Redux Thunk来解决的这个问题
// 如果返回的是函数, 那么就会调用这个函数, 传递过去dispatch 这个方法, 直到这个方法被执行
export const getAllProducts = () => {
  // debugger
  return dispatch => {
    // console.log('getAllProducts: dispatch: ', dispatch)
    shop.getProducts(products => {
      setTimeout(() => {
        dispatch(receiveProducts(products))
      })
    })
  }
}

/**
 * action 一定要有type
 */
// export const getAllProducts = () => ({
//   type: types.RECEIVE_PRODUCTS,
//   products: [
//     {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
//     {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
//     {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
//   ]
// })

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  // debugger
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      // type: types.CHECKOUT_SUCCESS,
      type: types.CHECKOUT_FAILURE,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}

export const decreaseFromCart = productId => (dispatch, getState) => {
  // debugger
  const { cart } = getState()
  dispatch({
    type: types.DECREASE_FROM_CART,
    productId,
    cart
  })
}