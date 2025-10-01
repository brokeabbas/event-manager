import React, { useState } from 'react';
import SeatingArrangementModal from './SeatingArrangementModal';
import { PresentationChartBarIcon } from '@heroicons/react/24/solid';

const SeatingArrangementTrigger = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex items-center justify-between gap-6 hover:shadow-xl transition-all duration-300">
      {/* Left Section with Icon and Text */}
      <div className="flex items-center gap-5">
        <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full">
          <PresentationChartBarIcon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Seating Plan Manager</h2>
          <p className="text-sm text-gray-500">Organize your event seating with ease and flexibility.</p>
        </div>
      </div>

      {/* Right Side Button */}
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
        >
          ✨ Open Seating Manager
        </button>
      </div>

      {/* Modal */}
      <SeatingArrangementModal visible={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SeatingArrangementTrigger;
