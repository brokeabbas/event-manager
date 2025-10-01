import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlusIcon,
  CogIcon,
  ClipboardDocumentListIcon,
  Bars3BottomLeftIcon,
  FolderIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';
import RightBar from '../components/hosts/RightBar';
import { CalendarIcon } from '@heroicons/react/24/solid';


const cardItems = [
  {
    label: 'Create Host',
    icon: UserPlusIcon,
    action: () => alert('Create Host Clicked'),
  },
  {
    label: 'Manage Hosts',
    icon: CogIcon,
    action: () => alert('Manage Hosts Clicked'),
  },
  {
    label: 'Hosts Tasks',
    icon: ClipboardDocumentListIcon,
    action: () => alert('Hosts Tasks Clicked'),
  },
  {
    label: 'Hosts Menu',
    icon: Bars3BottomLeftIcon,
    action: () => alert('Hosts Menu Clicked'),
  },
  {
    label: 'Hosts Groups',
    icon: FolderIcon,
    action: () => alert('Hosts Groups Clicked'),
  },
  {
    label: 'General Update',
    icon: ArrowPathIcon,
    action: () => alert('General Update Clicked'),
  },
  {
    label: 'Book Host',
    icon: ArrowPathIcon,
    action: () => alert('General Update Clicked'),
  },
];

const HostsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 pr-[19rem] pl-64 max-w-full space-y-10">
      {/* Header */}
      <div className="px-6 flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <UserPlusIcon className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Hosts Dashboard</h1>
        </div>
        <button
            onClick={() => navigate('/events')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow transition"
        > 
            <CalendarIcon className="w-5 h-5" />
            <span>See Events</span>
        </button>
        </div>


      {/* 3x2 Grid of Cards */}
      <div className="flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl px-6 w-full">
    {cardItems.map(({ label, icon: Icon, action }) => (
      <div
        key={label}
        onClick={action}
        className="flex flex-col items-start gap-6 p-8 bg-white shadow-lg rounded-2xl cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition"
      >
        <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full">
          <Icon className="w-8 h-8" />
        </div>
        <span className="text-2xl font-semibold text-gray-800">{label}</span>
      </div>
    ))}
  </div>
</div>


      <RightBar />
    </div>
  );
};

export default HostsDashboard;
