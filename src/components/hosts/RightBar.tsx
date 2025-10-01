import React from 'react';

const RightBar: React.FC = () => {
  return (
    <aside className="fixed top-16 right-0 w-72 h-[calc(100vh-4rem)] p-6 bg-white border-l shadow-md rounded-l-2xl hidden xl:block z-40 overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-4">📊 Quick Panel</h2>

      {/* Stats Section */}
      <div className="space-y-4">
        <div className="bg-emerald-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Hosts</p>
          <p className="text-xl font-bold text-emerald-700">18</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Active Events</p>
          <p className="text-xl font-bold text-blue-700">5</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Pending Tasks</p>
          <p className="text-xl font-bold text-purple-700">12</p>
        </div>
      </div>

      <hr className="my-6" />

      <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Activity</h3>
      <ul className="text-sm text-gray-600 space-y-2">
        <li>✓ Host John added</li>
        <li>✓ Event linked to Host</li>
        <li>⚠️ Task overdue</li>
      </ul>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg shadow-sm">
        <h4 className="text-sm font-semibold text-yellow-800">💡 Tip</h4>
        <p className="text-xs text-yellow-700 mt-1">
          Use bulk edit mode in “Manage Hosts” for speed.
        </p>
      </div>
    </aside>
  );
};

export default RightBar;
