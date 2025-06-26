import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, items: cartItems } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const productId = id?.toString();
  const isInCart = cartItems.some(item => item.productId === productId);
  const isInWishlist = wishlistItems.some(item => item.productId === productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();

        setProduct({
          id: data.id?.toString(),
          name: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
          rating: data.rating?.rate || "N/A",
          count: data.rating?.count || "0"
        });
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !product.id) return;

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    if (isInCart) {
      navigate('/cart');
    } else {
      addToCart(cartItem);
    }
  };

  const toggleWishlist = useCallback(() => {
    if (!product || !product.id) return;

    const pid = product.id.toString();
    const item = {
      productId: pid,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    isInWishlist ? removeFromWishlist(pid) : addToWishlist(item);
  }, [product, isInWishlist, addToWishlist, removeFromWishlist]);

  if (loading) {
    return (
      <div className="min-h-[89vh] flex justify-center items-center">
        <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[89vh] flex justify-center items-center text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-[89vh] py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={product.image || 'https://via.placeholder.com/500?text=No+Image'}
            alt={product.name}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-600 underline mb-4"
            >
              ← Back to Products
            </button>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
            <p className="text-2xl font-semibold text-indigo-600 mb-4">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md flex items-center justify-center"
            >
              <FiShoppingCart className="mr-2" />
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={toggleWishlist}
              className={`p-3 rounded-md transition ${isInWishlist ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
              title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <FiHeart className={`w-5 h-5 ${isInWishlist ? 'text-red-600 fill-current' : ''}`} />
            </button>
          </div>

          {/* Extra Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2 text-gray-800">Product Info</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-500">Category:</span> {product.category}</li>
              <li><span className="text-gray-500">Rating:</span> {product.rating} ★</li>
              <li><span className="text-gray-500">Reviews:</span> {product.count}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
