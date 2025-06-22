import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiClock } from 'react-icons/fi';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const order = state?.order || {
    id: '12345',
    date: new Date().toLocaleDateString(),
    total: 0,
    items: []
  };

  return (
    <div className="min-h-[89vh] bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <FiCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number</span>
            <span className="font-medium">#{order.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date</span>
            <span className="font-medium">{order.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total</span>
            <span className="font-bold text-indigo-600">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-8">
          <div className="bg-indigo-100 p-3 rounded-full">
            <FiPackage className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold">Your order is being processed</h3>
            <p className="text-gray-600 text-sm">
              We've received your order and will notify you when it ships.
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Link
            to="/products"
            className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;