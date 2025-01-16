import React, { useState, useEffect } from 'react';
import { OTPVerification } from './components/auth/OTPVerification';
import { Calendar } from './components/dashboard/Calendar';
import { BookingManagement } from './components/dashboard/BookingManagement';
import { Wallet } from './components/dashboard/Wallet';
import { Settings } from './components/dashboard/Settings';
import { Dashboard } from './components/dashboard/Dashboard';
import { Profile } from './components/dashboard/Profile';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { Provider, TimeSlot, Booking, Transaction } from './types';

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [provider, setProvider] = useState<Provider>({
    id: '1',
    name: 'Mohit',
    email: 'mohit123@gmail.com',
    phone: '+917893453214',
    isVerified: false,
    isOnline: false,
    walletBalance: 1250.75,
  });

  // Effect to handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Mock data
  const [timeSlots] = useState<TimeSlot[]>([
    {
      id: '1',
      startTime: new Date('2024-03-20T10:00:00'),
      endTime: new Date('2024-03-20T14:00:00'),
      isRecurring: true,
      recurringDays: [1],
    },
    {
      id: '2',
      startTime: new Date('2024-03-21T09:00:00'),
      endTime: new Date('2024-03-21T12:00:00'),
      isRecurring: false,
    },
    {
      id: '3',
      startTime: new Date('2024-03-22T14:00:00'),
      endTime: new Date('2024-03-22T17:00:00'),
      isRecurring: true,
      recurringDays: [3, 5],
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      customerId: 'c1',
      customerName: 'Sonu',
      serviceId: 's1',
      serviceName: 'Consultation',
      startTime: new Date('2024-03-21T11:00:00'),
      endTime: new Date('2024-03-21T12:00:00'),
      status: 'pending',
      price: 75.00,
    },
    {
      id: '2',
      customerId: 'c2',
      customerName: 'Nitin',
      serviceId: 's2',
      serviceName: 'Advisory Session',
      startTime: new Date('2024-03-22T14:00:00'),
      endTime: new Date('2024-03-22T15:00:00'),
      status: 'accepted',
      price: 90.00,
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 75.00,
      type: 'credit',
      description: 'Payment for consultation',
      timestamp: new Date('2024-03-19T15:30:00'),
      status: 'completed',
    },
  ]);

  const handleVerify = (otp: string) => {
    if (otp === '123456') {
      setIsVerified(true);
      setProvider({ ...provider, isVerified: true });
    }
  };

  const handleToggleOnline = () => {
    setProvider({ ...provider, isOnline: !provider.isOnline });
  };

  const handleLogout = () => {
    setIsVerified(false);
    setProvider({ ...provider, isVerified: false });
  };

  const handleUpdateProfile = (updatedProfile: Partial<Provider>) => {
    setProvider({ ...provider, ...updatedProfile });
  };

  const handleAcceptBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'accepted' } : booking
    ));
  };

  const handleRejectBooking = (bookingId: string, reason: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'rejected' } : booking
    ));
    console.log('Rejection reason:', reason);
  };

  if (!isVerified) {
    return (
      <OTPVerification
        onVerify={handleVerify}
        resendOTP={() => console.log('Resend OTP')}
      />
    );
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard provider={provider} bookings={bookings} />;
      case 'availability':
        return (
          <Calendar
            timeSlots={timeSlots}
            onAddSlot={() => {}}
            onEditSlot={() => {}}
            onDeleteSlot={() => {}}
          />
        );
      case 'bookings':
        return (
          <BookingManagement
            bookings={bookings}
            onAcceptBooking={handleAcceptBooking}
            onRejectBooking={handleRejectBooking}
          />
        );
      case 'wallet':
        return (
          <Wallet
            balance={provider.walletBalance}
            transactions={transactions}
            onRequestPayout={() => {}}
          />
        );
      case 'profile':
        return <Profile provider={provider} onUpdateProfile={handleUpdateProfile} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard provider={provider} bookings={bookings} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onlineStatus={provider.isOnline}
        onToggleOnline={handleToggleOnline}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onLogout={handleLogout}
        className="hidden md:block"
      />
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {renderContent()}
      </main>
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;