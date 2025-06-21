import React from "react";
import { FiUser, FiPackage, FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const Account = () => {
  // Dummy user data
  const user = {
    name: "Rednam Madhavi",
    email: "madhavi@example.com",
  };

  const handleLogout = () => {
    // Implement logout logic (e.g., clear tokens, redirect to login)
    console.log("Logged out");
  };

  return (
    <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Account
        </h1>

        <div className="space-y-6">
          {/* Profile Info */}
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="bg-indigo-600 text-white rounded-full p-3">
              <FiUser className="text-2xl" />
            </div>
            <div>
              <p className="text-xl font-semibold">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Orders Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:shadow transition">
            <div className="flex items-center gap-4">
              <FiPackage className="text-indigo-600 text-xl" />
              <Link to="/orders">
                My Orders
              </Link>
            </div>
          </div>

          {/* Settings Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:shadow transition">
            <div className="flex items-center gap-4">
              <FiSettings className="text-indigo-600 text-xl" />
              <Link to="/settings">
                Account Settings
              </Link>
            </div>
          </div>

          {/* Logout Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 border border-red-600 px-4 py-2 rounded-md transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
