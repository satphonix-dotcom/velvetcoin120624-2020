import React from 'react';
import { BarChart3, Package, ShoppingBag, Wallet } from 'lucide-react';
import type { VendorDashboardData } from '../../types/vendor';

const Dashboard: React.FC = () => {
  // Mock data - replace with actual API call
  const data: VendorDashboardData = {
    profile: {
      id: '1',
      name: 'Vendor Name',
      description: 'Vendor Description',
      logo: 'https://example.com/logo.png',
      coverImage: 'https://example.com/cover.png',
      location: 'New York, USA',
      establishedYear: 2020,
      categories: ['clothing', 'accessories'],
      rating: 4.5,
      totalSales: 1000,
      cryptoWallets: {
        eth: '0x123...',
        btc: 'bc1...'
      }
    },
    stats: {
      totalProducts: 50,
      totalOrders: 100,
      totalRevenue: {
        usd: 50000,
        eth: 20,
        btc: 1
      },
      averageRating: 4.5
    },
    recentProducts: [],
    recentOrders: []
  };

  const stats = [
    {
      label: 'Total Products',
      value: data.stats.totalProducts,
      icon: Package,
    },
    {
      label: 'Total Orders',
      value: data.stats.totalOrders,
      icon: ShoppingBag,
    },
    {
      label: 'Revenue (USD)',
      value: `$${data.stats.totalRevenue.usd.toLocaleString()}`,
      icon: Wallet,
    },
    {
      label: 'Average Rating',
      value: data.stats.averageRating.toFixed(1),
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
            Welcome back, {data.profile.name}
          </h1>
          <p className="font-body text-gray-600">
            Here's what's happening with your store today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-gray-600">{stat.label}</span>
              <stat.icon size={24} strokeWidth={1} className="text-gray-400" />
            </div>
            <p className="font-heading font-heading1 text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;