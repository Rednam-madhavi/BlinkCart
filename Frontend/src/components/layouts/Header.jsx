// src/components/layout/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiUser, FiMenu, FiHeart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Header = () => {
  const { cart } = useCart();
  const { wishlistItems } = useWishlist();

  // Safely get cart items count
  const cartItemsCount = cart?.items?.length || 0;

  // Safely get wishlist items count
  const wishlistItemsCount = wishlistItems?.length || 0;

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="flex items-center justify-between py-3 md:hidden">
          <button className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none">
            <FiMenu className="h-6 w-6" />
          </button>

          <Link to="/" className="text-xl font-bold tracking-tight">
            BlinkCart
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="p-2 rounded-md hover:bg-white/10">
              <FiHeart className="h-5 w-5" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 rounded-md hover:bg-white/10">
              <FiShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Header - similar safe checks should be applied here */}
        {/* ... rest of your header code ... */}

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between py-4">
          {/* Logo and Search */}
          <div className="flex-1 flex items-center space-x-6">
            <Link to="/" className="text-2xl font-bold tracking-tight hover:text-yellow-200 transition">
              Blink<span className="font-light">Cart</span>
            </Link>

            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              <Link to="/products" className="hover:text-yellow-200 transition duration-150 hover:scale-105">
                Products
              </Link>
              <Link to="/deals" className="hover:text-yellow-200 transition duration-150 hover:scale-105">
                Hot Deals
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4 ml-4">
              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-white/10 transition">
                <FiHeart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition">
                <FiShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* User Account */}
              <Link to="/account" className="hidden sm:flex items-center p-2 rounded-full hover:bg-white/10 transition">
                <FiUser className="h-5 w-5" />
              </Link>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2 ml-2">
                <Link to="/signin" className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white/10 transition">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 rounded-md bg-white text-indigo-600 text-sm font-medium hover:bg-gray-100 transition shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
