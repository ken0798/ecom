import Header from '../Header'
import CartContext from '../../context/CartContext'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'
import './index.css'

function TotalOrder(data) {
  const {list} = data
  const cartList = list
  let totalPrice = 0
  const cartCount = cartList.length
  cartList.forEach(element => {
    totalPrice += element.price * element.quantity
  })
  return (
    <div className="check_out">
      <h1>
        Order Total <span className="text-color">Rs:{totalPrice}/-</span>{' '}
      </h1>
      <p>{cartCount} items in cart</p>
      <button className="check_btn" type="button">
        Checkout
      </button>
    </div>
  )
}

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllItems} = value
      const isCartEmpty = cartList.length === 0
      return (
        <>
          <Header />
          {isCartEmpty ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <p
                  className="remove_button"
                  onClick={() => {
                    removeAllItems()
                  }}
                >
                  Remove All
                </p>
                <CartListView />
                <TotalOrder list={cartList} />
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
