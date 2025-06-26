import React from "react";
import ProductCard from "../components/ui/ProductCard";

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://via.placeholder.com/300?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    image: "https://via.placeholder.com/300?text=Smart+Watch",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://via.placeholder.com/300?text=Speaker",
  },
];

const Home = () => {
  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-indigo-50 to-white py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Welcome to <span className="text-indigo-600">BlinkCart</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover trending tech and lifestyle essentials at unbeatable prices.
          </p>
        </section>

        {/* Featured Products */}
        <section>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <a
            href="/products"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            Explore All Products
          </a>
        </section>
      </div>
    </main>
  );
};

export default Home;
