import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import * as ShoppingActions from '../actions'

class App extends React.Component {
  constructor (props) {
    // console.log(props)
    super(props)
  }

  componentDidMount () {
    const { actions } = this.props

    actions.getAllProducts()
  }

  render () {
    return (
      <div className="shopping-cart-container"> 
        <h2>Shopping Cart Example</h2>
        <hr/>
        <ProductsContainer />
        <hr/>
        <CartContainer />
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ShoppingActions, dispatch)
})

// export default App
export default connect(
  null,
  mapDispatchToProps
)(App)