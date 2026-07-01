import "../css/cart.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { formatCurrency } from "../units/formatCurrency";
import { useCartStore } from "../store/cartStore";

export default function CartMenu({ cartItems, onIncreaseQuantity, onDecreaseQuantity, onCheckout }) {

   const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [quantity, setQuantity] = useState(1);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);


  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-menu">
        <h2>Your cart:</h2>
        <div className="cart-empty-message">Your cart is empty.</div>
      </div>
    );
  }
 
  

  return (
    <div className="cart-menu">
      <h2>Your cart:</h2>
      
      <div className="cart-products">
         {cartItems.map((item, index) => {
          const itemQuantity = item.quantity || 1;
          const totalItemPrice = item.price * item.quantity;

          return (
            <Link to={item.link} key={index}
             className="cart-product-link">
              <div className="product-card-menu">
                <img src={item.img} alt={item.name} />
                
                <div className="product-details">
                  <div className="product-info-row">
                    <h3>{item.name}</h3>
                    <p className="product-price">{formatCurrency(totalItemPrice, item.currency)}</p>
                  </div>

                  {/* Quantity Control Panel */}
                  <div className="quantity-controls" onClick={(e) => e.preventDefault()}>
                    <button 
                      className="qty-btn" 
                      onClick={() => 
                        onDecreaseQuantity(item.cartId)
                      }
                      aria-label="Decrease quantity"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    
                    <span className="qty-number">{item.quantity}</span>
                    
                    <button 
                      className="qty-btn" 
                      onClick={() => 
                        onIncreaseQuantity(item.cartId)
                      }
                      aria-label="Increase quantity"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>

                </div>
              </div>
            </Link>
          )
         })}
      </div>

      {/* Persistent Checkout Footer */}
      <div className="checkout-footer">
        <div className="total-clear-section">
          <h3>Total: {formatCurrency(totalCartPrice,"EUR")}</h3>
          <button 
          className="clear-btn"
          onClick={() => clearCart()}>
            CLEAR
          </button>
        </div>
        <button className="checkout-btn" onClick={onCheckout}>
          Finish Purchase
        </button>
      </div>

    </div>
  )
}