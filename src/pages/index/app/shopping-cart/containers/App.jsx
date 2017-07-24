import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import * as ShoppingActions from '../actions'


// console.log('bindActionCreators(ShoppingActions, dispatch): ', bindActionCreators(ShoppingActions))
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ShoppingActions, dispatch)
})

@connect(null, mapDispatchToProps)
export default class App extends React.Component {
  constructor (props) {
    // console.log(props)
    super(props)
  }

  componentDidMount () {
    const { actions, getAllProducts } = this.props
    actions.getAllProducts()
    // ShoppingActions.getAllProducts()
    // getAllProducts()
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

// const _connect = connect
// export default App
// export default _connect(
//   null,
//   mapDispatchToProps
//   // { ...ShoppingActions }
// )(App)
// export default _connect(
//   null,
//   mapDispatchToProps
// )(App)


// export default App