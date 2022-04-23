import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  addCartQuantity: () => {},
  reduceCartQuantity: () => {},
  removeAllItems: () => {},
})

export default CartContext
