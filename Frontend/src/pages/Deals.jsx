import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiHeart } from "react-icons/fi";

const deals = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    image: "https://via.placeholder.com/500?text=Headphones",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 149.99,
    image: "https://via.placeholder.com/500?text=Smart+Watch",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "https://via.placeholder.com/500?text=Speaker",
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    price: 129.99,
    image: "https://via.placeholder.com/500?text=Earbuds",
  },
  {
    id: "5",
    name: "Fitness Tracker",
    price: 79.99,
    image: "https://via.placeholder.com/500?text=Fitness+Tracker",
  },
  {
    id: "6",
    name: "Tablet",
    price: 249.99,
    image: "https://via.placeholder.com/500?text=Tablet",
  },
];


const Deals = () => {
  const { addToCart } = useCart();
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.productId === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-indigo-50 to-purple-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Today's Top Deals</h1>

      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((product) => {
            const isInWishlist = wishlistItems.some(item => item.id === product.id);

            return (
              <div
                key={`${product.id}-${product.name}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-gray-100 transition-colors z-10"
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <FiHeart
                    className={`w-5 h-5 ${isInWishlist ? "text-red-500 fill-current" : "text-gray-400"}`}
                  />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-indigo-600 font-bold mt-1">${product.price.toFixed(2)}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Deals;