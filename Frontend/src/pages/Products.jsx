import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ui/ProductCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Products = () => {
  const { addToCart, items: cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addedToCart, setAddedToCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const wishlistIds = wishlistItems.map((item) => item.productId);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(["all", ...data]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url =
          selectedCategory === "all"
            ? "https://fakestoreapi.com/products"
            : `https://fakestoreapi.com/products/category/${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const toggleWishlist = (product) => {
    const productId = product.id.toString();
    const isInWishlist = wishlistIds.includes(productId);

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
      cartItems?.some((item) => item.productId === productId) ||
      addedToCart.includes(productId);

    if (!isInCart) {
      await addToCart({
        _id: productId,
        name: product.title,
        price: product.price,
        image: product.image,
      });
      setAddedToCart((prev) => [...prev, productId]);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-indigo-50 to-purple-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Browse Products by Category
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border font-medium capitalize transition ${selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                _id: product.id.toString(),
                name: product.title,
                price: product.price,
                image: product.image,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
