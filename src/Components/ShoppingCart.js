import React, { useEffect, useState } from 'react';
import { getToken } from './Helper/auth';

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const bearerToken = getToken();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5177/api/cart/', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error('Failed to fetch cart:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:5177/api/cart/add/${gameId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error('Failed to add item to cart:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:5177/api/cart/remove/${gameId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error('Failed to remove item from cart:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch('http://localhost:5177/api/cart/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        // Handle successful order creation
        console.log('Order created successfully!');
      } else {
        console.error('Failed to create order:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.cartItems.map((item) => (
              <li key={item.id}>
                {/* Display the cart item details here */}
                <p>Game ID: {item.id}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <p>Total: ${cart.total}</p>
          <button onClick={createOrder}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
