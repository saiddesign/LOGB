import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import PasswordLog from './PasswordLog';
import LinksLog from './LinksLog';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Personal Password Log', href: '/dashboard/personal' },
    { name: 'Business Password Log', href: '/dashboard/business' },
    { name: 'Links Log', href: '/dashboard/links' },
  ];

  return (
    <div className={`h-screen flex overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Sidebar and main content */}
      {/* ... (keep the existing sidebar code) ... */}

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className={`relative z-10 flex-shrink-0 flex h-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'}`}>
          {/* ... (keep the existing header code) ... */}
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Routes>
                <Route path="/personal" element={<PasswordLog type="personal" />} />
                <Route path="/business" element={<PasswordLog type="business" />} />
                <Route path="/links" element={<LinksLog />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;