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
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  removeAllItems = () => {
    this.setState({
      cartList: [],
    })
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(each => each.id !== id)
    this.setState({
      cartList: filteredCartList,
    })
  }

  onDecrementQuantity = id => {
    const {cartList} = this.state
    const getSpecificItem = cartList.find(each => each.id === id)
    if (getSpecificItem.quantity > 1) {
      this.setState({
        cartList: cartList.map(each => {
          let updateQuantity = each.quantity
          if (each.id === id) {
            updateQuantity -= 1
          }
          return {...each, quantity: updateQuantity}
        }),
      })
    } else {
      this.deleteCartItem(id)
    }
  }

  onIncrementQuantity = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.map(obj => {
        let updateQuantity = obj.quantity
        if (obj.id === id) {
          updateQuantity += 1
        }
        return {...obj, quantity: updateQuantity}
      }),
    })
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
            removeAllItems: this.removeAllItems,
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
