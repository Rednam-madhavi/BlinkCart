import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useUser } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const userId = user?._id || 'guest';

  const [cart, setCart] = useState({
    items: [],
    total: 0,
    isOpen: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cart/${userId}`);
      const items = res.data?.items || res.data || [];

      setCart(prev => ({
        ...prev,
        items,
        total: calculateTotal(items)
      }));
      setError(null);
    } catch (err) {
      setError("Failed to fetch cart");
      console.error("Fetch cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      await api.post('/cart', {
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
      setError("Add to cart failed");
      console.error("Add to cart error:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${userId}/${productId}`);
      await fetchCart();
    } catch (err) {
      setError("Remove from cart failed");
      console.error("Remove from cart error:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.patch(`/cart/${userId}/${productId}`, { quantity });
      await fetchCart();
    } catch (err) {
      setError("Update quantity failed");
      console.error("Update quantity error:", err);
    }
  };

  const toggleCart = () => {
    setCart(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const clearCart = async () => {
    try {
      // NOTE: implement this route in your backend if not yet
      await api.delete(`/cart/${userId}/clear`);
      setCart({ items: [], total: 0, isOpen: false });
    } catch (err) {
      setError("Clear cart failed");
      console.error("Clear cart error:", err);
    }
  };

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
