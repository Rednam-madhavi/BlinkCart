import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useUser } from "../context/UserContext";

const Signup = () => {
    const { register } = useUser();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState({ pass: false, confirm: false });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        const res = await register(formData.username, formData.email, formData.password);
        setLoading(false);

        if (!res.success) {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-[89vh] flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                    {/* Password Field */}
                    <div className="relative">
                        <input
                            type={show.pass ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => ({ ...s, pass: !s.pass }))}
                            aria-label={show.pass ? "Hide password" : "Show password"}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {show.pass ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <input
                            type={show.confirm ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
                            aria-label={show.confirm ? "Hide confirm password" : "Show confirm password"}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {show.confirm ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
