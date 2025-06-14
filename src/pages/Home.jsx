import React from "react";
import ProductCard from "../components/ProductCard";

const sampleProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 99.99,
    image: "https://via.placeholder.com/300"
  },
  {
    id: 2,
    name: "Product 2",
    price: 129.99,
    image: "https://via.placeholder.com/300"
  }
];

const Home = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;