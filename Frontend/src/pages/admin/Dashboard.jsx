import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiPackage, FiDollarSign, FiBarChart2 } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, you'd fetch these from your API
        setStats({
          users: 1243,
          products: 87,
          orders: 356,
          revenue: 12543.50
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  return (
    <div className="min-h-[89vh] bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<FiUsers className="text-2xl" />} 
          title="Users" 
          value={stats.users} 
          link="/admin/users"
        />
        <StatCard 
          icon={<FiPackage className="text-2xl" />} 
          title="Products" 
          value={stats.products} 
          link="/admin/products"
        />
        <StatCard 
          icon={<FiBarChart2 className="text-2xl" />} 
          title="Orders" 
          value={stats.orders} 
          link="/admin/orders"
        />
        <StatCard 
          icon={<FiDollarSign className="text-2xl" />} 
          title="Revenue" 
          value={`$${stats.revenue.toFixed(2)}`} 
          link="/admin/reports"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem 
            title="New order received" 
            time="2 minutes ago" 
            description="Order #4567 for $125.99"
          />
          <ActivityItem 
            title="New user registered" 
            time="15 minutes ago" 
            description="john.doe@example.com"
          />
          <ActivityItem 
            title="Product out of stock" 
            time="1 hour ago" 
            description="Wireless Headphones"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, link }) => (
  <Link to={link} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-indigo-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  </Link>
);

const ActivityItem = ({ title, time, description }) => (
  <div className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
    <div className="bg-indigo-100 p-2 rounded-full mt-1">
      <FiPackage className="text-indigo-600" />
    </div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="text-gray-400 text-xs mt-1">{time}</p>
    </div>
  </div>
);

export default AdminDashboard;