import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    quantity: 1,
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => each.id !== id)
    this.setState({
      cartList: filteredCartList,
    })
  }

  onDecrementQuantity = () => {
    const {quantity, cartList} = this.state
    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    } else {
      const updateCartList = cartList.filter(each => each.quantity !== 0)
      this.setState({
        cartList: updateCartList,
      })
    }
    console.log(quantity, cartList)
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {cartList, quantity} = this.state
    console.log(cartList)
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            quantity,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            addCartQuantity: this.onIncrementQuantity,
            reduceCartQuantity: this.onDecrementQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
