import React, { useEffect, useState } from "react";
import { FiUser, FiPackage, FiSettings, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("http://localhost:5000/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (isMounted) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        navigate("/login");
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[89vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Account
        </h1>

        <div className="space-y-6">
          {/* Profile Info */}
          <div className="flex items-start gap-4 border-b pb-4">
            <div className="bg-indigo-600 text-white rounded-full p-3 mt-1">
              <FiUser className="text-2xl" />
            </div>
            <div>
              <p className="text-xl font-semibold">
                {user.name || user.username}
              </p>
              <p className="text-gray-500 mb-1">{user.email}</p>
              {user.role && (
                <p className="text-sm text-gray-400">Role: {user.role}</p>
              )}
              {user.createdAt && (
                <p className="text-sm text-gray-400">
                  Member since:{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:shadow transition">
            <div className="flex items-center gap-4">
              <FiPackage className="text-indigo-600 text-xl" />
              <Link to="/orders">My Orders</Link>
            </div>
          </div>

          {/* Settings Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:shadow transition">
            <div className="flex items-center gap-4">
              <FiSettings className="text-indigo-600 text-xl" />
              <Link to="/settings">Account Settings</Link>
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
