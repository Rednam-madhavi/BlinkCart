import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import api from "../api/axios";

const Orders = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get(`/orders/${user._id}`);
            setOrders(res.data.orders || []);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?._id) fetchOrders();
    }, [user]);

    return (
        <div className="min-h-[89vh] bg-gradient-to-b from-gray-100 to-white py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

                {loading ? (
                    <p className="text-gray-600">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">You have not placed any orders yet.</p>
                ) : (
                    <ul className="space-y-6">
                        {orders.map((order, index) => (
                            <li
                                key={order._id || index}
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow transition"
                            >
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700">Order #{order._id?.slice(-6)}</h2>
                                        <p className="text-sm text-gray-500">
                                            Placed on{" "}
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <span
                                        className={`mt-2 sm:mt-0 inline-block text-sm px-3 py-1 rounded-full font-medium ${order.status === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "Shipped"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-indigo-100 text-indigo-700"
                                            }`}
                                    >
                                        {order.status || "Processing"}
                                    </span>
                                </div>

                                {/* Items */}
                                <div className="divide-y divide-gray-200">
                                    {order.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between py-3"
                                        >
                                            <div className="flex items-start sm:items-center gap-4">
                                                <img
                                                    src={item.image || "https://via.placeholder.com/60"}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-indigo-600 font-bold mt-2 sm:mt-0">
                                                ₹{(item.quantity * item.price).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="text-right mt-4">
                                    <p className="text-lg font-semibold text-gray-700">
                                        Total: ₹{order.totalAmount?.toFixed(2)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Orders;
