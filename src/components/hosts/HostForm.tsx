import React, { useState } from 'react';

const HostForm = ({ onAdd }: { onAdd: (host: { name: string; email: string }) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onAdd({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">➕ Add New Host</h2>
      <input
        type="text"
        placeholder="Host Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="email"
        placeholder="Host Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
      >
        Add Host
      </button>
    </form>
  );
};

export default HostForm;
