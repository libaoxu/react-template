import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout, decreaseFromCart } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

const CartContainer = function ({ products, total, checkout, decreaseFromCart}) {
  // console.log(products, total, checkout, arguments)
  
  return (
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkout(products)} 
    onDecreaseFromCartClicked={(productId) => decreaseFromCart(productId)}/>
)}

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})


export default connect(
  mapStateToProps,
  { checkout, decreaseFromCart }
)(CartContainer)
