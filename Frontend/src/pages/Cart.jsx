import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    items,
    total,
    updateQuantity,
    removeFromCart
  } = useCart();

  const subtotal = total.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h2>

        {items.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-6">
              {items.map((item) => (
                <li key={item.productId} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {`₹${item.price.toLocaleString("en-IN")} × ${item.quantity}`}
                      </div>

                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        <button
                          className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                          onClick={() =>
                            item.quantity > 1 &&
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          className="ml-3 text-red-600 text-sm hover:underline"
                          onClick={() => removeFromCart(item.productId)}
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-indigo-600 font-bold mt-2 sm:mt-0 min-w-max">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center border-t pt-4">
              <h4 className="text-xl font-semibold text-gray-800">Subtotal:</h4>
              <span className="text-2xl font-bold text-indigo-600">{subtotal}</span>
            </div>

            <div className="text-right mt-6">
              <Link
                to="/checkout"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
