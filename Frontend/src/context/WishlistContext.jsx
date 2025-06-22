import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const userId = user?.id || "guest";

  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`/api/v1/wishlist/${userId}`);
      setWishlistItems(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  const addToWishlist = async (product) => {
    try {
      await axios.post("/api/v1/wishlist", {
        userId,
        item: { ...product, productId: product.id },
      });
      fetchWishlist();
    } catch (err) {
      console.error("Add to wishlist failed", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/api/v1/wishlist/${userId}/${productId}`);
      fetchWishlist();
    } catch (err) {
      console.error("Remove from wishlist failed", err);
    }
  };

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
