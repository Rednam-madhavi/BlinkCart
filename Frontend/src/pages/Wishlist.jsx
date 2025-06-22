import React, { useEffect, useState } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useCart();

  // Fetch wishlist from server on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("/api/wishlist");
      setWishlistItems(res.data);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  // Add to cart and remove from wishlist (both in DB)
  const handleAddToCart = async (item) => {
    try {
      await axios.post("/api/cart", item); // Add to cart collection
      await axios.delete(`/api/wishlist/${item.id}`); // Remove from wishlist collection
      addToCart(item); // Update local cart context
      fetchWishlist(); // Refresh wishlist
    } catch (err) {
      console.error("Error moving item to cart", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/wishlist/${id}`);
      fetchWishlist();
    } catch (err) {
      console.error("Error removing item from wishlist", err);
    }
  };

  return (
    <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-48">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-indigo-600 mt-1 font-medium">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-sm rounded-md transition"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-md transition"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
