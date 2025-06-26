import React from "react";
import { FiUser, FiPackage, FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Account = () => {
  const { user, logout, loading } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[89vh]">
        <div
          className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[89vh]">
        <p className="text-gray-500 text-lg">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">My Account</h1>

        <div className="space-y-6">
          {/* User Info */}
          <div className="flex gap-4 border-b pb-4 items-start">
            <div className="bg-indigo-600 text-white p-3 rounded-full">
              <FiUser className="text-2xl" />
            </div>
            <div>
              <p className="text-xl font-semibold">{user.username}</p>
              <p className="text-gray-500">{user.email}</p>
              {user.role && (
                <p className="text-sm text-gray-400">Role: {user.role}</p>
              )}
            </div>
          </div>

          {/* Links */}
          <Link
            to="/orders"
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-md hover:shadow transition"
          >
            <FiPackage className="text-indigo-600 text-xl" />
            <span>My Orders</span>
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-md hover:shadow transition"
          >
            <FiSettings className="text-indigo-600 text-xl" />
            <span>Account Settings</span>
          </Link>

          {/* Logout */}
          <div className="text-center mt-8">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:text-red-700 hover:border-red-700 transition"
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
