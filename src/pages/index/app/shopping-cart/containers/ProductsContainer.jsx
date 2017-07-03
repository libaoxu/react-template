import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

const ProductsContainer = ({ products, bindAddToCart, name }) => {
  // console.log(products)
  return (
  <ProductsList title="Products">
    {/* name */}
    {products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onAddToCartClicked={() => {
          // 注意: 这里不是地址引用, 是绑定了新的函数, 是纯函数编程写法
          // 一旦 connect 第二个参数传入了, 就没有dispatch了
          bindAddToCart(product.id)
        }} />
    )}
  </ProductsList>
)}

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return ({
    products: getVisibleProducts(state.products),
    name: 123,
  })
}

export default connect(
  mapStateToProps,
  { bindAddToCart: addToCart }
)(ProductsContainer)
