import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

import EventForm from '../../components/Events/EventForm';
import CoverPhotoUploader from '../../components/Events/CoverPhotoUploader';
import MediaGallery from '../../components/Events/MediaGallery';
import FileUploader from '../../components/Events/FileUploader';
import VenueMapUploader from '../../components/Events/VenueMapUploader';
import SeatingArrangementTrigger from '../../components/Events/SeatingArrangementTrigger';
import InviteeList from '../../components/Events/InviteeList';
import HostList from '../../components/Events/HostList';
import ShareModal from '../../components/Events/ShareModal';

const mockEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    description: 'A global conference on technology advancements.',
    date: '2025-07-10T09:00:00',
    location: 'New York',
    recurrence: 'Annual',
    cover: 'https://source.unsplash.com/featured/?technology,conference',
  },
  {
    id: 2,
    title: 'AI Summit',
    description: 'A deep dive into AI trends and applications.',
    date: '2025-09-05T14:00:00',
    location: 'Los Angeles',
    recurrence: 'Monthly',
    cover: 'https://source.unsplash.com/featured/?ai,technology',
  },
];

const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find(e => e.id === Number(id));

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!event) {
    return <div className="pt-20 pl-64 pr-6">Event not found.</div>;
  }

  return (
    <div className="pt-20 pl-64 pr-6 pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/events/manage"
            className="flex items-center gap-2 text-sm text-green-600 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Management
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">
            Edit Event: {event.title}
          </h1>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md transition"
          >
            Share Event
          </button>
        </div>

        {/* Sections */}
        <EventForm event={event} />
        <CoverPhotoUploader eventId={event.id} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md min-h-[360px] transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
            <MediaGallery eventId={event.id} />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md min-h-[360px] transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
            <FileUploader eventId={event.id} />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md min-h-[360px] transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
            <VenueMapUploader eventId={event.id} />
          </div>
        </div>

        <SeatingArrangementTrigger eventId={event.id} />
        <InviteeList eventId={event.id} />
        <HostList eventId={event.id} />

        {/* Share Modal */}
        {isShareModalOpen && (
          <ShareModal
            visible={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            eventUrl={`https://yoursite.com/events/signup/${event.id}`}
          />
        )}
      </div>
    </div>
  );
};

export default EditEventPage;
