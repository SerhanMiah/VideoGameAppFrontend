import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Style/ShoppingCart.css';
import { getToken, userIsAuthenticated } from '../Helper/auth';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get('http://localhost:5177/api/ShoppingCart/GetCartItems', { headers });
      if (response.data && Array.isArray(response.data)) {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      } else {
        console.error('Unexpected API response:', response);
      }
    } catch (error) {
      console.error('Error retrieving cart items:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.game.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const addToCart = async (gameId, quantity) => {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.post('http://localhost:5177/api/ShoppingCart/AddToCart', { gameId, quantity }, { headers });
      getCartItems();
    } catch (error) {
      console.error('Error adding game to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.delete(`http://localhost:5177/api/ShoppingCart/RemoveFromCart/${cartItemId}`, { headers });
      getCartItems();
    } catch (error) {
      console.error('Error removing game from cart:', error);
    }
  };

  const changeQuantity = async (cartItemId, newQuantity) => {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.put(`http://localhost:5177/api/ShoppingCart/UpdateQuantity?cartItemId=${cartItemId}&newQuantity=${newQuantity}`, null, { headers });
      getCartItems();
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const proceedToCheckout = () => {
    if (userIsAuthenticated()) {
      // Implement your checkout logic here
      console.log('Proceeding to checkout');
    } else {
      // Redirect to login page or show login modal
      console.log('User must be logged in to proceed to checkout');
    }
  };

  return (
    <div className="shopping-cart">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {Array.isArray(cartItems) && cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.game.image} alt={item.game.name} className="item-image" />
              <div className="item-details">
                <h3 className="item-name">{item.game.name}</h3>
                <p className="item-price">Price: ${item.game.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    className="decrease-quantity"
                    onClick={() => changeQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    className="increase-quantity"
                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total</h3>
          <p>${totalPrice.toFixed(2)}</p>
          <button className="checkout-button" onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
