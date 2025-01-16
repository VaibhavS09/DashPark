import React, { useState } from 'react';
import { Bell, Shield, Save } from 'lucide-react';

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

interface AccountSettings {
  twoFactor: boolean;
  privacyMode: boolean;
}

export function Settings() {
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    email: true,
    sms: true,
    push: false,
  });

  const [account, setAccount] = useState<AccountSettings>({
    twoFactor: false,
    privacyMode: false,
  });

  const handleSaveSettings = () => {
    // In a real app, save settings to backend
    console.log('Saving settings:', { notifications, account });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Email Notifications</label>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.email ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700">SMS Notifications</label>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.sms ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.sms ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700">Push Notifications</label>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.push ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Two-Factor Authentication</label>
              <button
                onClick={() => setAccount(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  account.twoFactor ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    account.twoFactor ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700">Privacy Mode</label>
              <button
                onClick={() => setAccount(prev => ({ ...prev, privacyMode: !prev.privacyMode }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  account.privacyMode ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    account.privacyMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}