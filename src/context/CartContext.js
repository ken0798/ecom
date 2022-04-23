import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  quantity: 1,
  addCartItem: () => {},
  deleteCartItem: () => {},
  addCartQuantity: () => {},
  reduceCartQuantity: () => {},
})

export default CartContext
