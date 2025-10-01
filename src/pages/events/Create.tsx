// pages/events/create.tsx
import React, { useState } from 'react';

const reminderOptions = [
  { label: '1 Month Before', value: '1mo' },
  { label: '1 Week Before', value: '1w' },
  { label: '1 Day Before', value: '1d' },
  { label: '1 Hour Before', value: '1h' },
  { label: '10 Minutes Before', value: '10m' },
];

const CreateEventPage: React.FC = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: '',
    recurrence: 'none',
    hosts: '',
    documents: null as File | null,
    guests: '',
    ticketLimit: '',
    ticketPrice: '',
    reminders: [] as string[],
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target;

    if (name === 'documents' && files) {
      setEventData({ ...eventData, documents: files[0] });
      simulateUpload(files[0]);
    } else if (name === 'reminders') {
      const selected = Array.from((e.target as HTMLSelectElement).selectedOptions).map((opt) => opt.value);
      if (selected.length <= 3) {
        setEventData({ ...eventData, reminders: selected });
      }
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const simulateUpload = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(eventData);
  };

  return (
    <div className="pt-20 pl-64 pr-6 pb-10 min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl space-y-10 border border-gray-200"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">📅 Create Event</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <FloatingInput label="Event Title" name="title" type="text" value={eventData.title} onChange={handleChange} required />
            <FloatingInput label="Venue" name="venue" type="text" value={eventData.venue} onChange={handleChange} />
            <FloatingInput label="Hosts" name="hosts" type="text" value={eventData.hosts} onChange={handleChange} />
            <FloatingInput label="Ticket Limit" name="ticketLimit" type="number" value={eventData.ticketLimit} onChange={handleChange} />
            <FloatingInput label="Ticket Price ($)" name="ticketPrice" type="number" value={eventData.ticketPrice} onChange={handleChange} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FloatingInput label="Start Date" name="startDate" type="date" value={eventData.startDate} onChange={handleChange} />
            <FloatingInput label="End Date" name="endDate" type="date" value={eventData.endDate} onChange={handleChange} />
            <FloatingInput label="Start Time" name="startTime" type="time" value={eventData.startTime} onChange={handleChange} />
            <FloatingInput label="End Time" name="endTime" type="time" value={eventData.endTime} onChange={handleChange} />
          </div>

          <FloatingTextarea
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FloatingSelect
              label="Recurrence"
              name="recurrence"
              value={eventData.recurrence}
              onChange={handleChange}
              options={[
                { label: 'None', value: 'none' },
                { label: 'Daily', value: 'daily' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Monthly', value: 'monthly' },
                { label: 'Annual', value: 'annual' },
              ]}
            />
            <div className="relative">
              <label className="block mb-1 text-sm text-gray-600">Reminders (max 3)</label>
              <select
                multiple
                name="reminders"
                value={eventData.reminders}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                {reminderOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">Hold ⌘/Ctrl to select multiple</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Required Documents</label>
            <input
              type="file"
              name="documents"
              onChange={handleChange}
              className="file:bg-green-600 file:text-white file:px-4 file:py-1 file:rounded-full file:border-none"
            />
            {eventData.documents && (
              <div className="mt-2 w-full bg-gray-100 rounded-lg overflow-hidden">
                <div className="bg-green-500 h-2 transition-all" style={{ width: `${uploadProgress}%` }} />
                <p className="text-sm mt-1 text-gray-600">{eventData.documents.name}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Guests</label>
            <textarea
              name="guests"
              value={eventData.guests}
              onChange={handleChange}
              placeholder="guest1@example.com, guest2@example.com"
              className="w-full border border-gray-300 rounded-lg shadow-sm p-3"
            />
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              🚀 Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// FloatingInput Component
const FloatingInput = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full border border-gray-300 rounded-md px-3 pt-6 pb-2 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
    />
    <label
      htmlFor={name}
      className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
    >
      {label}
    </label>
  </div>
);

// FloatingTextarea Component
const FloatingTextarea = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => (
  <div className="relative">
    <textarea
      name={name}
      rows={4}
      placeholder=" "
      value={value}
      onChange={onChange}
      className="peer w-full border border-gray-300 rounded-md px-3 pt-6 pb-2 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
    />
    <label
      htmlFor={name}
      className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
    >
      {label}
    </label>
  </div>
);

// FloatingSelect Component
const FloatingSelect = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { label: string; value: string }[];
}) => (
  <div className="relative">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="peer w-full border border-gray-300 rounded-md px-3 pt-6 pb-2 text-base bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <label
      htmlFor={name}
      className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-600"
    >
      {label}
    </label>
  </div>
);

export default CreateEventPage;
