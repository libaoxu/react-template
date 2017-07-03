import React from 'react'
import { connect } from 'react-redux'
import { decreaseFromCart } from '../actions'
import PropTypes from 'prop-types'
import Product from './Product'

const Cart  = ({ products, total, onCheckoutClicked, onDecreaseFromCartClicked, dispatch, decreaseFromCart }) => {
  const hasProducts = products.length > 0
  // console.log(dispatch)
  const nodes = hasProducts ? (
    products.map(product => 
      <div>
        <Product
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          key={product.id}
        />
        <button
          style={{
            'background-color': 'rgba(255,73,73,.1)',
            'border-color': 'rgba(255,73,73,.1)',
            'color': '#ff4949'
          }}
          className="dec"
          // onClick={() => onDecreaseFromCartClicked(product.id)}
          onClick={() => decreaseFromCart(product.id)}
          disabled={product.quantity > 0 ? '' : 'disabled'}>
          {product.quantity > 0 ? 'decrease' : 'none'}
        </button>
      </div>
      )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button style={{
        'border-color': '#13ce66',
        'background-color': '#13ce66',
        'color': '#fff'
      }} 
        onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}


// export default connect()(Cart)
export default connect(null, { decreaseFromCart })(Cart)
