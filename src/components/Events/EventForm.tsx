import React from 'react';

const EventForm = ({ event }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Title</label>
      <input defaultValue={event.title} className="w-full mt-1 px-4 py-2 border rounded-lg" />
    </div>
    <div>
      <label className="block text-sm font-medium">Description</label>
      <textarea defaultValue={event.description} className="w-full mt-1 px-4 py-2 border rounded-lg" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <input type="date" defaultValue={event.date.split('T')[0]} className="px-4 py-2 border rounded-lg" />
      <input type="time" defaultValue={event.date.split('T')[1].slice(0, 5)} className="px-4 py-2 border rounded-lg" />
    </div>
    <input defaultValue={event.location} className="w-full px-4 py-2 border rounded-lg" />
    <select defaultValue={event.recurrence} className="w-full px-4 py-2 border rounded-lg">
      {['None', 'Daily', 'Weekly', 'Monthly', 'Annual'].map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default EventForm;
