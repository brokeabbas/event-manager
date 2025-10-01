import React from 'react';
import { PlusIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

const RightSummaryPanel: React.FC = () => {
  const activities = [
    { title: 'Withdraw Earning', time: '12:40 am', amount: 4120, type: 'income' },
    { title: 'Paying Website tax', time: '10:20 am', amount: -230, type: 'expense' },
  ];

  const categories = [
    { name: 'Footwear', count: 18941, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Accessories', count: 26061, color: 'bg-green-100 text-green-800' },
  ];

  return (
    <aside className="w-full lg:w-96 bg-white rounded-3xl shadow-lg px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Summary</h2>

        {/* Balance Card */}
        <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Your Balance</div>
          <div className="text-3xl font-bold text-gray-900">$10,632.00</div>

          <div className="flex justify-between mt-3 text-xs">
            <div className="flex items-center text-green-600 gap-1">
              <ArrowUpIcon className="w-4 h-4" />
              $3,250.07
            </div>
            <div className="flex items-center text-red-500 gap-1">
              <ArrowDownIcon className="w-4 h-4" />
              $1,062.90
            </div>
          </div>

          <button className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition">
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">See all</button>
        </div>
        <ul className="space-y-4">
          {activities.map((act, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{act.title}</p>
                <p className="text-xs text-gray-400">{act.time}</p>
              </div>
              <div
                className={`text-sm font-semibold ${
                  act.amount > 0 ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {act.amount > 0 ? `$${act.amount}` : `-$${Math.abs(act.amount)}`}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Categories</h3>
        <p className="text-sm text-gray-500 mb-4">
          Explore your top categories and keep shopping with cashback
        </p>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`rounded-xl p-4 ${cat.color} shadow-md transition-all hover:shadow-lg hover:scale-[1.02] transform duration-300 cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center mb-2">
                  {/* Example emoji or icon */}
                  <span className="text-lg">{cat.emoji}</span>
                </div>
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs font-medium mt-1">{cat.count.toLocaleString()} units</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};

export default RightSummaryPanel;
