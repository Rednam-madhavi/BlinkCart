import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = {
    id,
    name: `Product ${id}`,
    price: 99.99,
    image: "https://via.placeholder.com/500"
  };

  return (
    <div className="p-6">
      <img src={product.image} alt={product.name} className="w-full max-w-md mx-auto" />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;