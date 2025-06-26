import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useUser } from "./UserContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const userId = user?._id;
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get(`/wishlist/${userId}`);
      setWishlistItems(res.data || []);
    } catch (err) {
      console.error("Failed to fetch wishlist", err.response?.data || err.message);
      setWishlistItems([]);
    }
  };


  const addToWishlist = async (product) => {
    try {
      await api.post("/wishlist", {
        userId,
        item: {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
      await fetchWishlist();
    } catch (err) {
      console.error("Add to wishlist failed", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${userId}/${productId}`);
      await fetchWishlist();
    } catch (err) {
      console.error("Remove from wishlist failed", err);
    }
  };

  useEffect(() => {
    if (userId) fetchWishlist();
  }, [userId]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
