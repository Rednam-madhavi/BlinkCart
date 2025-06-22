import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  return (
    <div className="min-h-[89vh] py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-96 object-contain"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-indigo-600 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description || 'No description available'}</p>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md flex items-center justify-center"
            >
              <FiShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
              onClick={() => isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`p-3 rounded-md ${isInWishlist ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <FiHeart className={isInWishlist ? 'fill-current' : ''} />
            </button>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="space-y-2">
              {product.details?.map((detail, i) => (
                <li key={i} className="flex">
                  <span className="text-gray-500 w-32">{detail.key}:</span>
                  <span>{detail.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;