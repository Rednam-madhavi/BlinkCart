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

  useEffect(() => {
    setUsername(user?.username || "");
  }, [user]);

  const handleUpdateUsername = async () => {
    try {
      const res = await api.patch(`/users/${user._id}`, { username });
      setUser(res.data.user);
      setMessage("Username updated");
    } catch (err) {
      console.error("Failed to update username", err);
      setMessage("Failed to update username");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return setMessage("All password fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("New password and confirm password must match.");
    }

    try {
      await api.patch(`/users/change-password`, {
        currentPassword,
        newPassword,
      });
      setMessage("✅ Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Password change failed:", err);
      setMessage("Password change failed.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await api.delete(`/users/${user._id}`);
      logout();
      navigate("/signup");
    } catch (err) {
      console.error("Failed to delete account", err);
      setMessage("Failed to delete account");
    }
  };

  return (
    <div className="min-h-[89vh] py-12 px-4 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Account Settings</h1>
          {message && <p className="mt-2 text-sm text-indigo-600">{message}</p>}
        </div>

        {/* Profile Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={handleUpdateUsername}
              className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 font-medium transition"
            >
              Save Username
            </button>
          </div>
        </div>

        {/* Password Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleChangePassword}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 font-medium transition"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="text-xl font-semibold text-red-600 mb-4">Security</h2>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 font-medium transition"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
