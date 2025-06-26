import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiPackage, FiDollarSign, FiBarChart2, FiActivity } from 'react-icons/fi';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Replace with real API call
                setStats({
                    users: 1243,
                    products: 87,
                    orders: 356,
                    revenue: 12543.5,
                });
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[89vh]">
                <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-[89vh] bg-gradient-to-br from-gray-100 to-white p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    icon={<FiUsers className="text-2xl text-indigo-600" />}
                    title="Users"
                    value={stats.users.toLocaleString()}
                    link="/admin/users"
                />
                <StatCard
                    icon={<FiPackage className="text-2xl text-indigo-600" />}
                    title="Products"
                    value={stats.products.toLocaleString()}
                    link="/admin/products"
                />
                <StatCard
                    icon={<FiBarChart2 className="text-2xl text-indigo-600" />}
                    title="Orders"
                    value={stats.orders.toLocaleString()}
                    link="/admin/orders"
                />
                <StatCard
                    icon={<FiDollarSign className="text-2xl text-indigo-600" />}
                    title="Revenue"
                    value={`₹${stats.revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                    link="/admin/reports"
                />
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                    <FiActivity className="text-indigo-600" /> Recent Activity
                </h2>

                <div className="space-y-5">
                    {[
                        {
                            title: 'New order received',
                            time: '2 minutes ago',
                            description: 'Order #4567 for ₹125.99',
                        },
                        {
                            title: 'New user registered',
                            time: '15 minutes ago',
                            description: 'john.doe@example.com',
                        },
                        {
                            title: 'Product out of stock',
                            time: '1 hour ago',
                            description: 'Wireless Headphones',
                        },
                    ].map((activity, index) => (
                        <ActivityItem key={index} {...activity} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, link }) => (
    <Link
        to={link}
        className="bg-white rounded-lg shadow p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">{icon}</div>
        </div>
    </Link>
);

const ActivityItem = ({ title, time, description }) => (
    <div className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
        <div className="bg-indigo-100 p-2 rounded-full mt-1">
            <FiPackage className="text-indigo-600" />
        </div>
        <div>
            <h3 className="font-medium text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
    </div>
);

export default AdminDashboard;
