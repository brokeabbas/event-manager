import React from 'react';

const options = ['Today', 'Week', 'Month', 'Custom'];

interface Props {
  selected: string;
  onChange: (value: string) => void;
}

const TimeRangeToggle: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex gap-2 mb-6">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1 rounded ${
            selected === opt ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeToggle;
