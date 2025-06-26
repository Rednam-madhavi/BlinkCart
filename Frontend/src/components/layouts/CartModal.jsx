import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../ui/Button';

const CartModal = () => {
  const { cartItems, removeFromCart, total, isOpen, toggleCart } = useContext(CartContext);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleCart}
          ></div>

          {/* Modal Panel */}
          <div className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-lg bg-white h-full max-h-screen overflow-y-auto shadow-lg z-50 p-4 sm:p-6">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="p-1 rounded hover:bg-gray-100 transition"
                aria-label="Close cart"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            {/* Cart Content */}
            {cartItems.length === 0 ? (
              <div className="mt-6 text-center text-gray-500">
                Your cart is empty.
              </div>
            ) : (
              <div className="mt-4 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex flex-col">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p>₹{item.price}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <p className="text-lg font-bold">Total: ₹{total}</p>
                  <Button className="w-full mt-4">Proceed to Checkout</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
