import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="border-b pb-2">
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;