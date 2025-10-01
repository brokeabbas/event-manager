import React from 'react';

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const KPIModal: React.FC<Props> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
        ✖
      </button>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  </div>
);

export default KPIModal;
