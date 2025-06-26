import React, { useState } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [loadingIds, setLoadingIds] = useState([]);

  const handleAddToCart = async (item) => {
    setLoadingIds((prev) => [...prev, item.productId]);
    try {
      await addToCart(item);
      await removeFromWishlist(item.productId);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== item.productId));
    }
  };

  const handleRemove = async (productId) => {
    setLoadingIds((prev) => [...prev, productId]);
    try {
      await removeFromWishlist(productId);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== productId));
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
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => {
              const isLoading = loadingIds.includes(item.productId);

              return (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
                >
                  <img
                    src={item.image}
                    alt={item.name || "Wishlist item"}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h2>
                      <p className="text-indigo-600 mt-1 font-medium">${item.price}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4 gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-sm rounded-md transition disabled:opacity-50"
                        aria-label="Add to cart"
                      >
                        <FiShoppingCart /> {isLoading ? "Adding..." : "Add to Cart"}
                      </button>

                      <button
                        onClick={() => handleRemove(item.productId)}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-md transition disabled:opacity-50"
                        aria-label="Remove from wishlist"
                      >
                        <FiTrash2 /> {isLoading ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
