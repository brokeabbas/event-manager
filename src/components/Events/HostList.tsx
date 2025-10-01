import React, { useState } from 'react';
import { UserIcon, TrashIcon, StarIcon } from '@heroicons/react/24/solid';

const mockHosts = ['John Smith', 'Emily Roe', 'Lara Dev', 'Marcus Tan', 'Grace Lee', 'Nina Kuo'];

const HostList = () => {
  const [headHostIndex, setHeadHostIndex] = useState<number | null>(null);

  return (
    <div className="w-full transition-all duration-300 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md p-6">
      <label className="block font-bold text-gray-800 text-lg mb-4">Event Hosts</label>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockHosts.map((host, i) => (
          <div
            key={i}
            className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm transition hover:shadow-md overflow-hidden min-h-[140px]"
          >
            <div className="flex h-full">
              {/* Left: Icon/Image Area */}
              <div className="flex items-center justify-center bg-green-100 w-1/3 min-h-full p-4">
                <UserIcon className="w-10 h-10 text-green-600" />
              </div>

              {/* Right: Host Info & Actions */}
              <div className="flex flex-col justify-between w-2/3 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-800 truncate">{host}</span>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setHeadHostIndex(i)}
                  className={`mt-3 text-xs font-medium px-3 py-1 rounded-lg transition ${
                    headHostIndex === i
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-100 hover:bg-yellow-100 text-gray-800'
                  }`}
                >
                  {headHostIndex === i ? (
                    <span className="flex items-center justify-center gap-1">
                      <StarIcon className="w-4 h-4" />
                      Head Host
                    </span>
                  ) : (
                    'Assign as Head Host'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition">
        + Add Host
      </button>
    </div>
  );
};

export default HostList;
