import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, setUser, logout } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUsername(user?.username || "");
  }, [user]);

  const handleUpdateUsername = async () => {
    try {
      const res = await api.patch(`/users/${user._id}`, { username });
      setUser(res.data.user);
      setMessage("✅ Username updated successfully.");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update username.");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("All password fields are required.");
    }
    if (newPassword !== confirmPassword) {
      return setError("New password and confirmation do not match.");
    }

    try {
      await api.patch(`/users/change-password`, {
        currentPassword,
        newPassword,
      });
      setMessage("✅ Password changed successfully.");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError("Password change failed.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await api.delete(`/users/${user._id}`);
      logout();
      navigate("/signup");
    } catch (err) {
      console.error(err);
      setError("Failed to delete account.");
    }
  };

  return (
    <div className="min-h-[89vh] py-12 px-4 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Account Settings</h1>
          {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
          {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
        </div>

        {/* Profile Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
          <div className="space-y-4">
            <label className="block text-sm text-gray-700">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
            <button
              onClick={handleUpdateUsername}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save Username
            </button>
          </div>
        </section>

        {/* Password Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleChangePassword}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Update Password
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-xl font-semibold text-red-600 mb-4">Security</h2>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Delete My Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
