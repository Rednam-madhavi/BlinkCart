import React from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (item) => {
    await addToCart(item);
    await removeFromWishlist(item.productId);
  };

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId);
  };

  return (
    <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col justify-between h-48">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-indigo-600 mt-1 font-medium">${item.price}</p>
                  </div>
                  <div className="flex justify-between mt-4 gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-sm rounded-md transition"
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-md transition"
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
