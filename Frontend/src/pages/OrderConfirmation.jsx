import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';

const OrderConfirmation = () => {
  const { state } = useLocation();

  const order = state?.order || {
    id: '12345',
    date: new Date().toLocaleDateString(),
    total: 0,
    items: []
  };

  return (
    <div className="min-h-[89vh] bg-gradient-to-br from-gray-100 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        {/* Confirmation Header */}
        <div className="text-center mb-8">
          <FiCheckCircle className="mx-auto text-6xl text-green-500 mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-gray-800">Order Confirmed!</h1>
          <p className="text-gray-600 mt-1">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-6 mb-8 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm sm:text-base">
            <SummaryRow label="Order Number" value={`#${order.id}`} />
            <SummaryRow label="Order Date" value={order.date} />
            <SummaryRow
              label="Items"
              value={`${order.items?.length || 0} item${order.items?.length !== 1 ? 's' : ''}`}
            />
            <SummaryRow
              label="Total"
              value={
                <span className="font-bold text-indigo-600">
                  ₹{order.total?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '0.00'}
                </span>
              }
            />
          </div>
        </div>

        {/* Order Status */}
        <div className="flex items-start gap-4 mb-8">
          <div className="bg-indigo-100 p-3 rounded-full">
            <FiPackage className="text-indigo-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Your order is being processed</h3>
            <p className="text-gray-600 text-sm">
              We’ve received your order and will notify you when it has been shipped.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
          <Link
            to="/products"
            className="w-full sm:w-auto text-center px-6 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="w-full sm:w-auto text-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-700">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default OrderConfirmation;
