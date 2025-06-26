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
        if (user?._id) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="min-h-[89vh] bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>

                {loading ? (
                    <p className="text-gray-600">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">You have not placed any orders yet.</p>
                ) : (
                    <ul className="space-y-6">
                        {orders.map((order, index) => (
                            <li key={order._id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-700">Order #{order._id}</h2>
                                        <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-white bg-indigo-600 px-3 py-1 rounded-full">
                                            {order.status || "Processing"}
                                        </span>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={item.image || "https://via.placeholder.com/60"}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {item.quantity} × ${item.price}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-indigo-600 font-bold">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-right mt-4">
                                    <p className="text-lg font-semibold text-gray-700">
                                        Total: ${order.totalAmount.toFixed(2)}
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
