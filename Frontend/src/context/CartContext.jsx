// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useUser } from './UserContext'; // Import UserContext to get current user

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser(); // Get current user from UserContext
  const [cart, setCart] = useState({ items: [], total: 0, isOpen: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get userId - use logged in user's ID or 'guest' if not authenticated
  const userId = user?._id || 'guest';

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart({
        items: res.data.items || [],
        total: calculateTotal(res.data.items || []),
        isOpen: cart.isOpen // Maintain current modal state
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      await await api.post('/cart', {
        userId,
        item: {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        }
      });
      await fetchCart();
    } catch (err) {
      setError(err.message);
      console.error("Add to cart failed:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${userId}/${productId}`);
      await fetchCart();
    } catch (err) {
      setError(err.message);
      console.error("Remove from cart failed:", err);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await api.patch(`/cart/${userId}/${productId}`, { quantity: newQuantity });
      await fetchCart();
    } catch (err) {
      setError(err.message);
      console.error("Update quantity failed:", err);
    }
  };

  const toggleCart = () => {
    setCart(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const clearCart = async () => {
    try {
      await api.delete(`/cart/${userId}/clear`);
      setCart({ items: [], total: 0, isOpen: false });
    } catch (err) {
      setError(err.message);
      console.error("Clear cart failed:", err);
    }
  };

  // Fetch cart on initial render and when user changes
  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
    <CartContext.Provider
      value={{
        ...cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};