import React, { useState } from 'react';
import { CalendarIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { QRCodeCanvas } from 'qrcode.react';

const mockEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    date: '2025-07-10T09:00:00',
    location: 'New York',
    recurrence: 'Annual',
    cover: 'https://source.unsplash.com/featured/?technology,conference',
  },
  {
    id: 2,
    title: 'AI Summit',
    date: '2025-09-05T14:00:00',
    location: 'Los Angeles',
    recurrence: 'Monthly',
    cover: 'https://source.unsplash.com/featured/?ai,technology',
  },
];

const EventManagementPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesRecurrence = recurrence ? event.recurrence.toLowerCase() === recurrence.toLowerCase() : true;
    return matchesSearch && matchesRecurrence;
  });

  const getSignupUrl = (id: number) => `https://yourdomain.com/events/signup/${id}`;

  return (
    <div className="pt-20 pl-64 pr-6 pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-semibold text-gray-800">Manage Events</h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Recurrence</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annual">Annual</option>
            </select>
            <Link
              to="/events/create"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md transition"
            >
              + Create Event
            </Link>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="relative flex flex-col rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition transform hover:scale-[1.02]"
            >
              {/* Cover Image */}
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={event.cover}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 p-5 bg-white bg-gradient-to-br from-white via-gray-50 to-white animate-gradientFlow">
                <h2 className="text-lg font-bold text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-600 mt-1"><strong>Venue:</strong> {event.location}</p>
                <p className="text-sm text-gray-600"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600"><strong>Time:</strong> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-sm text-gray-600"><strong>Recurrence:</strong> {event.recurrence}</p>
                <p className="text-xs text-gray-500 mt-2">Starts {formatDistanceToNowStrict(parseISO(event.date), { addSuffix: true })}</p>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Link
                  to={`/events/edit/${event.id}`}
                  className="flex items-center gap-1 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 px-3 py-1.5 rounded-full shadow"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </Link>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full shadow"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-500">No events found.</p>
        )}
      </div>

      {/* Share Modal */}
      {selectedEvent && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative">
      <button
        onClick={() => setSelectedEvent(null)}
        className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">🔗 Share Event</h2>
      <p className="text-sm text-gray-500 mb-4">
        Invite people to sign up for <strong>{selectedEvent.title}</strong>
      </p>

      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 bg-gray-100 rounded-xl">
          <QRCodeCanvas
            id="event-qr"
            value={getSignupUrl(selectedEvent.id)}
            size={160}
            bgColor="#FFFFFF"
            fgColor="#111827"
            includeMargin={true}
            level="Q"
          />
        </div>

        <div className="text-sm text-gray-600 break-all text-center cursor-pointer hover:text-green-600" onClick={() => {
          navigator.clipboard.writeText(getSignupUrl(selectedEvent.id));
          alert('Link copied to clipboard!');
        }}>
          {getSignupUrl(selectedEvent.id)}
        </div>

        <button
          onClick={() => {
            const canvas = document.getElementById('event-qr') as HTMLCanvasElement;
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = `event-${selectedEvent.id}-qr.png`;
            link.click();
          }}
          className="mt-2 text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow"
        >
          Download QR Code
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default EventManagementPage;
