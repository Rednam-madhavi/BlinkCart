import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios"; // Your configured axios instance
import { useUser } from "./UserContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const userId = user?.id || null;
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist from API
  const fetchWishlist = async () => {
    try {
      const endpoint = userId
        ? `/wishlist/${userId}`
        : `/wishlist/guest`; // for guest users

      const res = await axiosInstance.get(endpoint);
      setWishlistItems(res.data?.wishlist || []);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  // Add item to wishlist
  const addToWishlist = async (product) => {
    try {
      await axiosInstance.post("/wishlist", {
        userId: userId || "guest",
        item: { ...product, productId: product.id },
      });
      fetchWishlist();
    } catch (err) {
      console.error("Add to wishlist failed", err);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const uid = userId || "guest";
      await axiosInstance.delete(`/wishlist/${uid}/${productId}`);
      fetchWishlist();
    } catch (err) {
      console.error("Remove from wishlist failed", err);
    }
  };

  // Load wishlist on user change
  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
