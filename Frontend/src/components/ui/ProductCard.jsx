import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      <Link
        to={`/products/${product.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <img
          src={product.image}
          alt={product.name || product.title}
          className="w-full h-60 object-contain p-4 transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300?text=No+Image";
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name || product.title}
          </h3>
          <p className="text-gray-600 mt-1">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
