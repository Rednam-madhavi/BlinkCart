import React, { useState } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

// Initial dummy wishlist items
const initialWishlistItems = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://via.placeholder.com/300?text=Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 149.99,
    image: "https://via.placeholder.com/300?text=Smart+Watch",
  },
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const { addToCart } = useCart();

  // Add item to cart
  const handleAddToCart = (item) => {
    addToCart(item);
    setWishlistItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  // Remove item from wishlist
  const handleRemove = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
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
