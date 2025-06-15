import React from "react";
import ProductCard from "../components/ui/ProductCard";

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://via.placeholder.com/300?text=Headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    image: "https://via.placeholder.com/300?text=Smart+Watch"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://via.placeholder.com/300?text=Speaker"
  }
];

const Home = () => {
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-indigo-50 to-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome to <span className="text-indigo-600">BlinkCart</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Discover trending tech and lifestyle essentials at unbeatable prices.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="/products"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Explore All Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
