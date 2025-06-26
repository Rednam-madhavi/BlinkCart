// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=3");
        const data = await res.json();

        const formatted = Array.isArray(data)
          ? data
            .filter(p => p?.id && p?.title && p?.image)
            .map(product => ({
              id: product.id.toString(),
              name: product.title,
              price: product.price,
              image: product.image,
            }))
          : [];

        setFeatured(formatted);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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



