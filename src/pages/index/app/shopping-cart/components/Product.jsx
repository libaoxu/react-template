import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, quantity, title }) => (
  <div>
    {title} - &#36;{price}{` x ${inventory || quantity || 0}`}
  </div>
)

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string
}

export default Product
