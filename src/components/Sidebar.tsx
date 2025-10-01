import React from 'react';
import {
  HomeIcon,
  ChartBarIcon,
  CubeIcon,
  TagIcon,
  CalendarIcon,
  UserCircleIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Summary', icon: HomeIcon, path: '/' },
  { label: 'My Events', icon: CalendarIcon, path: '/events' },
  { label: 'Hosts', icon: UserGroupIcon, path: '/hosts' },
  { label: 'Product', icon: CubeIcon, path: '/products' },
  { label: 'Tickets', icon: TagIcon, path: '/categories' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-600 to-green-800 text-white shadow-xl p-6 flex flex-col justify-between rounded-r-3xl z-50">
      
      {/* Logo */}
      <div>
        <div className="flex flex-col items-start">
          <span className="text-3xl font-extrabold tracking-tight">CHECKNIN</span>
          <span className="text-sm italic text-white/80 font-serif">for events</span>
        </div>
      </div>

      {/* Navigation (Vertically Centered) */}
      <nav className="flex-grow flex flex-col justify-center">
        <ul className="space-y-5">
          {navItems.map(({ label, icon: Icon, path }) => (
            <li key={label}>
              <a
                href={path}
                className="flex items-center gap-3 text-white/80 hover:text-white font-medium transition-transform duration-200 hover:scale-105"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg text-white">
        <UserCircleIcon className="w-8 h-8 text-white/80" />
        <div>
          <p className="text-sm font-semibold">Sola Bickersteth</p>
          <p className="text-xs text-green-200 font-semibold">VIEW PLAN</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
