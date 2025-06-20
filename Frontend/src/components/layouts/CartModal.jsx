// src/components/layout/CartModal.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../ui/Button';

const CartModal = () => {
  const { cartItems, removeFromCart, total, isOpen, toggleCart } = useContext(CartContext);
  const [visible, setVisible] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleCart}></div>

          {/* Modal Panel */}
          <div className="ml-auto w-full sm:w-96 bg-white h-full shadow-lg p-4 overflow-y-auto z-50">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={toggleCart}>
                <AiOutlineClose size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="mt-6 text-center text-gray-500">Your cart is empty.</div>
            ) : (
              <div className="mt-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p>₹{item.price}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 border-t pt-4">
                  <p className="text-lg font-bold">Total: ₹{total}</p>
                  <Button className="w-full mt-2">Proceed to Checkout</Button>
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
