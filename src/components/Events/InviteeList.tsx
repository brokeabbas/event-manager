import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import './shine.css'; // custom shimmer animation
import '@fontsource/lexend/700.css'; // thick modern font

const mockInvitees = ['Alice', 'Bob', 'Charlie', 'Diana'];
const dailyConfirmations = [
  { date: '2025-05-21', count: 2 },
  { date: '2025-05-22', count: 3 },
  { date: '2025-05-23', count: 1 },
  { date: '2025-05-24', count: 4 },
  { date: '2025-05-25', count: 2 },
  { date: '2025-05-26', count: 5 },
  { date: '2025-05-27', count: 3 },
];

const InviteeDashboard = ({ onClick }) => {
  const totalConfirmed = mockInvitees.length;

  return (
    <div className="flex flex-wrap gap-6 font-[Lexend]">
      {/* Confirmation Count Card */}
      <div className="bg-gradient-to-br from-green-100 via-white to-blue-100 p-6 rounded-2xl shadow-lg basis-1/4 min-w-[240px] flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-2 tracking-wide uppercase">Confirmed Guests</h2>

        <div className="relative mb-4">
          <span className="text-[64px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 animate-shimmer">
            {totalConfirmed}
          </span>
        </div>

        <button
          onClick={onClick}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition hover:brightness-105 hover:shadow-lg"
        >
          View Guests
        </button>
      </div>

      {/* Chart Card */}
<div className="bg-white p-6 rounded-2xl shadow-lg basis-2/4 min-w-[300px] flex-1 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-bold text-gray-900 tracking-wide uppercase">Daily Confirmations</h3>
    
    <div className="flex gap-2 items-center">
      {/* Filter Dropdown */}
      <select
        onChange={(e) => console.log('Filter:', e.target.value)} // replace with state
        className="text-sm text-gray-700 border rounded-md px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="all">All Time</option>
      </select>

      {/* Share Link Button */}
      <button
        onClick={() => navigator.clipboard.writeText('https://yourapp.com/invite')}
        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm px-3 py-1.5 rounded-md shadow hover:brightness-105 transition"
      >
        Share Invite Link
      </button>
    </div>
  </div>

  <ResponsiveContainer width="100%" height={220}>
    <LineChart data={dailyConfirmations}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="date" fontSize={12} />
      <YAxis allowDecimals={false} fontSize={12} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#6366F1"
        strokeWidth={3}
        dot={{ r: 5 }}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

    </div>
  );
};

export default InviteeDashboard;
