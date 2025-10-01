import React from 'react';

const HostTable = ({ hosts }: { hosts: { name: string; email: string }[] }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">🛠️ Manage Hosts</h2>
    <table className="w-full table-auto text-left">
      <thead>
        <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {hosts.map((host, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{host.name}</td>
            <td className="p-2">{host.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default HostTable;
