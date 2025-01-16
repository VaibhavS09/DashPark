import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star,
  UserCheck,
  CalendarCheck,
  Coins,
  BarChart2,
  Timer,
  Medal
} from 'lucide-react';
import { Booking, Provider } from '../../types';

interface DashboardProps {
  provider: Provider;
  bookings: Booking[];
}

export function Dashboard({ provider, bookings }: DashboardProps) {
  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: UserCheck,
      change: '+12.5%',
      color: 'bg-primary-500',
    },
    {
      title: 'Today\'s Appointments',
      value: bookings.filter(b => 
        new Date(b.startTime).toDateString() === new Date().toDateString()
      ).length,
      icon: CalendarCheck,
      change: '+5.2%',
      color: 'bg-primary-500',
    },
    {
      title: 'Total Earnings',
      value: `₹${provider.walletBalance.toFixed(2)}`,
      icon: Coins,
      change: '+18.7%',
      color: 'bg-primary-500',
    },
    {
      title: 'Completion Rate',
      value: '95%',
      icon: BarChart2,
      change: '+2.3%',
      color: 'bg-primary-500',
    },
  ];

  const upcomingBookings = bookings
    .filter(b => new Date(b.startTime) > new Date())
    .slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {provider.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <Icon className="h-6 w-6 text-primary-500" />
                </div>
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Timer className="h-5 w-5 text-primary-500 mr-2" />
            Upcoming Appointments
          </h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{booking.customerName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{booking.serviceName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(booking.startTime).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(booking.startTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Medal className="h-5 w-5 text-primary-500 mr-2" />
            Performance Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Customer Rating</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">5.0 (48 reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <h3 className="font-medium text-gray-900 dark:text-white">Response Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average 15 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}