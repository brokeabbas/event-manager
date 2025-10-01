import React from 'react';
import {
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const TopBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-64 right-0 z-50 h-16 px-6 bg-white/70 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-b border-gray-200 flex items-center justify-between">
      {/* Left: Title or Logo */}
      <div className="text-xl font-semibold text-gray-800 tracking-tight">
        Event Center Dashboard
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-5">
        <button className="group relative text-gray-500 hover:text-blue-600 transition">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
        </button>
        <button className="text-gray-500 hover:text-blue-600 transition">
          <Cog6ToothIcon className="w-6 h-6" />
        </button>
        <button className="text-gray-500 hover:text-blue-600 transition">
          <UserCircleIcon className="w-7 h-7" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
