import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Deals from "./pages/Deals";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;