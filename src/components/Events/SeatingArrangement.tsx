import React, { useState } from 'react';

const categories = {
  vip: { label: 'VIP', color: 'bg-purple-600' },
  regular: { label: 'Regular', color: 'bg-green-500' },
  official: { label: 'Official', color: 'bg-blue-500' },
  government: { label: 'Govt.', color: 'bg-yellow-500' },
};

const rows = 6;
const cols = 10;

const SeatingArrangement = () => {
  const [seats, setSeats] = useState<{ type: keyof typeof categories | null }[][]>(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ type: null })))
  );
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories>('regular');

  const toggleSeat = (r: number, c: number) => {
    const current = seats[r][c];
    const updated = [...seats];
    updated[r][c] = {
      type: current.type === selectedCategory ? null : selectedCategory,
    };
    setSeats(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 tracking-tight font-serif">
          🎟️ Customize Seating Arrangement
        </h3>
        <p className="text-sm text-gray-500 mb-3">Select a seat type below and click seats to assign them.</p>
        
        <div className="flex items-center gap-3 flex-wrap">
          {Object.entries(categories).map(([key, { label, color }]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as keyof typeof categories)}
              className={`px-4 py-1.5 rounded-full text-white text-sm font-medium shadow transition-all ${
                selectedCategory === key ? 'ring-2 ring-offset-2 ring-green-500' : ''
              } ${color}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-10 gap-2 p-4 rounded-lg bg-white shadow-md border">
        {seats.map((row, rIdx) =>
          row.map((seat, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => toggleSeat(rIdx, cIdx)}
              className={`w-10 h-10 rounded-md cursor-pointer flex items-center justify-center text-xs font-bold text-white transition-all duration-200 ${
                seat.type ? categories[seat.type].color : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
              title={`Seat ${rIdx + 1}-${cIdx + 1}`}
            >
              {seat.type ? categories[seat.type].label[0] : ''}
            </div>
          ))
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
        {Object.entries(categories).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-sm ${color}`} />
            <span>{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded-sm" />
          <span>Unassigned</span>
        </div>
      </div>
    </div>
  );
};

export default SeatingArrangement;
