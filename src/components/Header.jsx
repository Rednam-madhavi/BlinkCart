import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">
        ShopSphere
      </Link>
      <nav className="space-x-4">
        <Link to="/cart" className="hover:text-gray-300">
          Cart
        </Link>
        <Link to="/checkout" className="hover:text-gray-300">
          Checkout
        </Link>
      </nav>
    </header>
  );
};

export default Header;