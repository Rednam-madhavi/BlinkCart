import React from "react";

const Checkout = () => {
  return (
    <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Billing and Shipping Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Billing & Shipping</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                type="text"
                placeholder="Address Line 2 (optional)"
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-300 p-3 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="w-full border border-gray-300 p-3 rounded-md"
                />
              </div>
              <select className="w-full border border-gray-300 p-3 rounded-md text-gray-500">
                <option>Country</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
            </form>
          </div>

          {/* Payment and Summary */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="form-radio" defaultChecked />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="form-radio" />
                <span>UPI / Netbanking</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="form-radio" />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {/* Order Summary */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
              <h4 className="text-lg font-semibold mb-3">Order Summary</h4>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>$439.97</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold border-t pt-2">
                <span>Total</span>
                <span>$449.97</span>
              </div>
            </div>

            {/* Place Order */}
            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
