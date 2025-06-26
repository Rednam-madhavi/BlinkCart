import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiSearch,
  FiUser,
  FiMenu,
  FiHeart,
  FiX,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useUser } from "../../context/UserContext";

const Header = () => {
  const { items: cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, loading } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemsCount = cartItems?.length || 0;
  const wishlistItemsCount = wishlistItems?.length || 0;

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4 relative">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-md"
            >
              {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>

            <Link to="/" className="text-xl font-bold tracking-tight">
              Blink<span className="font-light">Cart</span>
            </Link>
          </div>

          <div className="hidden md:flex w-full max-w-xl mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden md:flex items-center space-x-6 ml-4">
              <Link to="/products" className="hover:text-yellow-200 font-medium">
                Products
              </Link>
              <Link to="/deals" className="hover:text-yellow-200 font-medium">
                Hot Deals
              </Link>
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-white/10 rounded-md"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            <Link to="/wishlist" className="relative p-2 hover:bg-white/10 rounded-full">
              <FiHeart className="h-5 w-5" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-full">
              <FiShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {!loading && (
              user ? (
                <Link to="/account" className="hidden sm:flex p-2 hover:bg-white/10 rounded-full">
                  <FiUser className="h-5 w-5" />
                </Link>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/login" className="text-sm hover:underline">Login</Link>
                  <Link
                    to="/signup"
                    className="px-3 py-1.5 bg-white text-indigo-600 text-sm rounded-md hover:bg-gray-100 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden space-y-3 pb-4 border-t border-white/10 pt-3">
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-200">
              Products
            </Link>
            <Link to="/deals" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-200">
              Hot Deals
            </Link>
            {user ? (
              <Link to="/account" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-200">
                My Account
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-200">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block hover:text-yellow-200">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-0 z-40 px-4 py-3 md:hidden bg-white shadow-md border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Search for products..."
              className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
