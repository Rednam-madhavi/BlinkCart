import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiHeart } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Deals = () => {
  const { addToCart, items: cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const trending = data
          .filter(product => product.rating?.rate >= 4)
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .slice(0, 9);

        setDeals(trending);
      } catch (err) {
        console.error("Failed to fetch trending products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const toggleWishlist = (product) => {
    const productId = product.id.toString();
    const isInWishlist = wishlistItems.some(item => item.productId === productId);

    const item = {
      productId,
      name: product.title,
      price: product.price,
      image: product.image,
    };

    isInWishlist ? removeFromWishlist(productId) : addToWishlist(item);
  };

  const handleCartClick = async (product) => {
    const productId = product.id.toString();
    const isInCart =
      cartItems.some(item => item.productId === productId) ||
      addedToCart.includes(productId);

    if (isInCart) {
      navigate("/cart");
    } else {
      await addToCart({
        _id: productId,
        name: product.title,
        price: product.price,
        image: product.image,
      });
      setAddedToCart(prev => [...prev, productId]);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-indigo-50 to-purple-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🔥 Trending Products
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((product) => {
              const productId = product.id.toString();
              const isInWishlist = wishlistItems.some(
                (item) => item.productId === productId
              );
              const isInCart =
                cartItems.some((item) => item.productId === productId) ||
                addedToCart.includes(productId);

              return (
                <div
                  key={productId}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 relative"
                >
                  {/* ❤️ Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-gray-100 transition-colors z-10"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <FiHeart
                      className={`w-5 h-5 ${isInWishlist ? "text-red-500 fill-current" : "text-gray-400"}`}
                    />
                  </button>

                  {/* 🖼️ Product Image (Linked) */}
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-contain"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/500?text=No+Image")
                      }
                    />
                  </Link>

                  {/* 📦 Info */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.title}
                    </h2>
                    <p className="text-indigo-600 font-bold mt-1">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    {/* 🛒 Cart Button */}
                    <div className="mt-4">
                      <button
                        onClick={() => handleCartClick(product)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        aria-label={isInCart ? "Go to cart" : "Add to cart"}
                      >
                        {isInCart ? "Go to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Deals;
