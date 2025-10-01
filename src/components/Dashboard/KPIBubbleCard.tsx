import React from 'react';
import classNames from 'classnames';

interface KPIBubbleCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string; // Tailwind gradient class
}

const KPIBubbleCard: React.FC<KPIBubbleCardProps> = ({ label, value, icon, gradient }) => {
  return (
    <div
      className={classNames(
        'rounded-2xl p-5 text-white shadow-md transition-transform hover:scale-105 cursor-pointer',
        gradient
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-light opacity-80">{label}</div>
        <div className="text-white">{icon}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default KPIBubbleCard;
