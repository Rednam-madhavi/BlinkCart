import React, { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    country: "",
    payment: "card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = (e) => {
    e.preventDefault();
    console.log("Placing order with data:", formData);
    // TODO: send formData + cart info to backend
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout</h2>

        <form onSubmit={handleOrder} className="grid md:grid-cols-2 gap-8">
          {/* Billing and Shipping Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Billing & Shipping</h3>

            {[
              { label: "Full Name", type: "text", name: "name" },
              { label: "Email Address", type: "email", name: "email" },
              { label: "Phone Number", type: "tel", name: "phone" },
              { label: "Address Line 1", type: "text", name: "address1" },
              { label: "Address Line 2 (optional)", type: "text", name: "address2" },
            ].map(({ label, type, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required={name !== "address2"}
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-gray-300 p-3 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="w-full border border-gray-300 p-3 rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md text-gray-700"
                required
              >
                <option value="">Select Country</option>
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>

          {/* Payment & Order Summary */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h3>
            <div className="space-y-4">
              {[
                { label: "Credit/Debit Card", value: "card" },
                { label: "UPI / Netbanking", value: "upi" },
                { label: "Cash on Delivery", value: "cod" },
              ].map(({ label, value }) => (
                <label key={value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={formData.payment === value}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
              <h4 className="text-lg font-semibold mb-3">Order Summary</h4>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                ₹{Number(43997).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Shipping</span>
                <span>₹49</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold border-t pt-2">
                <span>Total</span>
                <span>₹{(43997 + 49).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
