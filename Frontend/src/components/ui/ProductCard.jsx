import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      <Link
        to={`/products/${product._id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
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
